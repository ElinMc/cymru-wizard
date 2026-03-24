// ============================================================
// BANTANI CYMRU RUBRIC CREATOR — Application Logic
// ============================================================

const D = CurriculumData;

// ---- State ----
const rubricState = {
  area: '',
  progressionStep: '',
  selectedStatements: [],   // array of SWM ids
  customOutcomes: '',
  taskDescription: '',
  uploadedText: '',
  generatedRubric: null     // raw AI response
};

// ---- Area ID shorthand map (for CSS classes) ----
const areaClassMap = {
  'expressive-arts': 'ea',
  'health-wellbeing': 'hw',
  'humanities': 'hu',
  'languages': 'la',
  'maths': 'ma',
  'science-tech': 'st'
};

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  populateDropdowns();
  document.getElementById('rubricArea').addEventListener('change', onAreaChange);
  document.getElementById('rubricStep').addEventListener('change', () => {
    rubricState.progressionStep = document.getElementById('rubricStep').value;
  });
});

function populateDropdowns() {
  const areaSelect = document.getElementById('rubricArea');
  D.areas.forEach(a => {
    const opt = document.createElement('option');
    opt.value = a.id;
    opt.textContent = `${a.icon} ${a.title}`;
    areaSelect.appendChild(opt);
  });

  const stepSelect = document.getElementById('rubricStep');
  D.progressionSteps.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.step;
    opt.textContent = `Step ${p.step}: ${p.description} (ages ${p.ages})`;
    stepSelect.appendChild(opt);
  });
}

function onAreaChange() {
  rubricState.area = document.getElementById('rubricArea').value;
  // Clear selected statements when area changes
  rubricState.selectedStatements = [];
  renderSelectedChips();
}

// ---- SWM Picker Modal ----
function openSwmPicker() {
  const modal = document.getElementById('swmModal');
  const content = document.getElementById('swmModalContent');
  const selectedArea = rubricState.area;

  if (!selectedArea) {
    content.innerHTML = `
      <div class="swm-empty">
        <div class="swm-empty-icon">📖</div>
        <p>Please select an Area of Learning and Experience first.</p>
      </div>`;
    modal.classList.add('active');
    return;
  }

  // Get statements for selected area (or all if desired)
  const areas = selectedArea ? D.areas.filter(a => a.id === selectedArea) : D.areas;
  
  let html = '';
  areas.forEach(area => {
    html += `<div style="margin-bottom:0.5rem;"><strong style="color:${area.color};font-size:0.8rem;text-transform:uppercase;letter-spacing:0.04em;">${area.icon} ${area.title}</strong></div>`;
    area.statementsOfWhatMatters.forEach(s => {
      const isSelected = rubricState.selectedStatements.includes(s.id);
      html += `
        <div class="swm-modal-item ${isSelected ? 'selected' : ''}" onclick="toggleSwm('${s.id}', this)">
          <div class="swm-check">${isSelected ? '✓' : ''}</div>
          <div class="swm-info">
            <div class="swm-area-tag" style="color:${area.color}">${area.title}</div>
            <h4>${s.title}</h4>
            <p>${s.summary}</p>
          </div>
        </div>`;
    });
  });

  content.innerHTML = html;
  modal.classList.add('active');
}

function closeSwmPicker() {
  document.getElementById('swmModal').classList.remove('active');
}

function toggleSwm(id, el) {
  const idx = rubricState.selectedStatements.indexOf(id);
  if (idx >= 0) {
    rubricState.selectedStatements.splice(idx, 1);
    el.classList.remove('selected');
    el.querySelector('.swm-check').textContent = '';
  } else {
    rubricState.selectedStatements.push(id);
    el.classList.add('selected');
    el.querySelector('.swm-check').textContent = '✓';
  }
  renderSelectedChips();
}

function renderSelectedChips() {
  const container = document.getElementById('swmSelectedChips');
  if (rubricState.selectedStatements.length === 0) {
    container.innerHTML = '';
    return;
  }

  container.innerHTML = rubricState.selectedStatements.map(id => {
    const { stmt, area } = findSwm(id);
    if (!stmt || !area) return '';
    return `<span class="swm-chip" style="background:${area.color}" onclick="removeSwm('${id}')">
      ${stmt.title} <span class="chip-remove">✕</span>
    </span>`;
  }).join('');
}

function removeSwm(id) {
  rubricState.selectedStatements = rubricState.selectedStatements.filter(s => s !== id);
  renderSelectedChips();
}

function findSwm(id) {
  for (const area of D.areas) {
    const stmt = area.statementsOfWhatMatters.find(s => s.id === id);
    if (stmt) return { stmt, area };
  }
  return { stmt: null, area: null };
}

// ---- PDF Upload ----
let uploadedPdfText = '';

async function handlePdfUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  document.getElementById('pdfFilename').textContent = file.name;

  try {
    // Use pdf.js to extract text
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let text = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map(item => item.str).join(' ');
      text += pageText + '\n\n';
    }
    
    uploadedPdfText = text.trim();
    rubricState.uploadedText = uploadedPdfText;

    // Show preview
    const preview = document.getElementById('pdfPreview');
    const previewText = document.getElementById('pdfPreviewText');
    previewText.textContent = uploadedPdfText.substring(0, 800) + (uploadedPdfText.length > 800 ? '…' : '');
    preview.style.display = 'block';
  } catch (err) {
    console.error('PDF parse error:', err);
    document.getElementById('pdfFilename').textContent = '❌ Could not read PDF';
  }
}

function clearPdf() {
  uploadedPdfText = '';
  rubricState.uploadedText = '';
  document.getElementById('pdfFileInput').value = '';
  document.getElementById('pdfFilename').textContent = 'No file selected';
  document.getElementById('pdfPreview').style.display = 'none';
}

// ---- Generate Rubric ----
async function generateRubric() {
  // Gather state
  rubricState.area = document.getElementById('rubricArea').value;
  rubricState.progressionStep = document.getElementById('rubricStep').value;
  rubricState.customOutcomes = document.getElementById('customOutcomes').value.trim();
  rubricState.taskDescription = document.getElementById('taskDescription').value.trim();

  // Validate
  if (!rubricState.area) {
    alert('Please select an Area of Learning and Experience.');
    return;
  }
  if (!rubricState.progressionStep) {
    alert('Please select a Progression Step.');
    return;
  }
  if (rubricState.selectedStatements.length === 0 && !rubricState.customOutcomes && !rubricState.taskDescription) {
    alert('Please select at least one Statement of What Matters, add custom outcomes, or describe the task.');
    return;
  }

  // Build statement details
  const statementDetails = rubricState.selectedStatements.map(id => {
    const { stmt, area } = findSwm(id);
    return stmt ? { id: stmt.id, title: stmt.title, summary: stmt.summary, description: stmt.description, area: area.title } : null;
  }).filter(Boolean);

  const area = D.areas.find(a => a.id === rubricState.area);
  const step = D.progressionSteps.find(p => p.step == rubricState.progressionStep);

  // Show loading
  const btn = document.getElementById('generateBtn');
  btn.disabled = true;
  document.getElementById('rubricLoading').style.display = 'block';
  document.getElementById('rubricOutput').style.display = 'none';

  try {
    const resp = await fetch('/api/rubric', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        area: area ? area.title : rubricState.area,
        areaId: rubricState.area,
        progressionStep: step ? `Step ${step.step}: ${step.description} (ages ${step.ages})` : rubricState.progressionStep,
        selectedStatements: statementDetails,
        customOutcomes: rubricState.customOutcomes,
        taskDescription: rubricState.taskDescription,
        uploadedText: rubricState.uploadedText
      })
    });

    if (!resp.ok) {
      const err = await resp.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to generate rubric');
    }

    const data = await resp.json();
    rubricState.generatedRubric = data.rubric;
    displayRubric(data.rubric, area, step);
  } catch (err) {
    document.getElementById('rubricOutput').style.display = 'block';
    document.getElementById('rubricOutput').innerHTML = `
      <div class="rubric-error">
        <h3>⚠️ Generation Error</h3>
        <p>${err.message}</p>
        <button class="btn btn-primary" onclick="generateRubric()">🔄 Try Again</button>
      </div>`;
  } finally {
    btn.disabled = false;
    document.getElementById('rubricLoading').style.display = 'none';
  }
}

// ---- Display Rubric ----
function displayRubric(rubricText, area, step) {
  const output = document.getElementById('rubricOutput');
  output.style.display = 'block';

  // Try to parse the rubric as JSON
  let rubricData = null;
  try {
    // Extract JSON from markdown code blocks if present
    let jsonStr = rubricText;
    const jsonMatch = rubricText.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) jsonStr = jsonMatch[1];
    rubricData = JSON.parse(jsonStr);
  } catch (e) {
    // Will render as formatted text fallback
  }

  const areaClass = areaClassMap[area?.id] || '';
  const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  let html = `<div class="rubric-area-${areaClass}">`;

  // Header
  html += `
    <div class="rubric-result-header">
      <img src="logo.jpg" alt="Bantani Cymru">
      <h2>${rubricData?.title || 'Analytic Rubric'}</h2>
      <div class="rubric-meta">
        ${area ? `${area.icon} ${area.title}` : ''} · ${step ? `Step ${step.step} (ages ${step.ages})` : ''}
        · Generated ${today}
      </div>
    </div>`;

  // Mapped statements reference
  if (rubricState.selectedStatements.length > 0) {
    html += `<div class="rubric-statements-ref">
      <h4>📌 Mapped Statements of What Matters</h4>
      <div class="ref-list">
        ${rubricState.selectedStatements.map(id => {
          const { stmt, area: a } = findSwm(id);
          return stmt ? `<span class="ref-tag" style="background:${a.color}">${stmt.title}</span>` : '';
        }).join('')}
      </div>
    </div>`;
  }

  // Rubric table
  if (rubricData && rubricData.criteria && rubricData.criteria.length > 0) {
    html += renderRubricTable(rubricData);
  } else {
    // Fallback: render as formatted markdown
    html += `<div class="rubric-table-wrapper" style="padding:1.5rem;">
      <div style="white-space:pre-wrap;font-size:0.85rem;line-height:1.65;">${formatRubricText(rubricText)}</div>
    </div>`;
  }

  // Actions
  html += `
    <div class="rubric-actions">
      <button class="btn btn-primary" onclick="requestRubricDownload()">📄 Download Rubric (PDF)</button>
      <button class="btn btn-secondary" onclick="window.print()">🖨️ Print</button>
      <button class="btn btn-secondary" onclick="copyRubricText()">📋 Copy as Text</button>
      <button class="btn btn-secondary" onclick="generateRubric()">🔄 Regenerate</button>
    </div>`;

  html += '</div>';
  output.innerHTML = html;
  output.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderRubricTable(data) {
  const levels = data.levels || ['Emerging', 'Developing', 'Securing', 'Excelling'];
  const levelClasses = ['emerging', 'developing', 'securing', 'excelling'];

  let html = `<div class="rubric-table-wrapper">
    <table class="rubric-table">
      <thead>
        <tr>
          <th class="level-criteria">Criterion</th>
          ${levels.map((l, i) => `<th class="level-${levelClasses[i] || 'securing'}">${l}</th>`).join('')}
        </tr>
      </thead>
      <tbody>`;

  data.criteria.forEach(c => {
    html += `<tr>
      <td>
        <span class="criterion-title">${escapeHtml(c.name || c.criterion || '')}</span>
        ${c.swm ? `<span class="criterion-swm">↳ ${escapeHtml(c.swm)}</span>` : ''}
      </td>`;
    
    const descriptors = c.descriptors || c.levels || {};
    levels.forEach(level => {
      const key = level.toLowerCase();
      const desc = descriptors[key] || descriptors[level] || '';
      html += `<td>${escapeHtml(desc)}</td>`;
    });
    
    html += `</tr>`;
  });

  html += `</tbody></table></div>`;
  return html;
}

function formatRubricText(text) {
  // Basic markdown formatting
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^### (.+)$/gm, '<h4 style="margin:1rem 0 0.5rem;color:var(--welsh-green);">$1</h4>')
    .replace(/^## (.+)$/gm, '<h3 style="margin:1.25rem 0 0.5rem;">$1</h3>')
    .replace(/^# (.+)$/gm, '<h2 style="margin:1.5rem 0 0.5rem;">$1</h2>')
    .replace(/^[-•] (.+)$/gm, '<li>$1</li>')
    .replace(/\n\n/g, '<br><br>');
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ---- Copy ----
function copyRubricText() {
  const output = document.getElementById('rubricOutput');
  const text = output.innerText;
  navigator.clipboard.writeText(text).then(() => {
    alert('Rubric copied to clipboard!');
  }).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    alert('Rubric copied to clipboard!');
  });
}

// ---- Download / Registration ----
function requestRubricDownload() {
  if (sessionStorage.getItem('cymru_registered')) {
    performRubricDownload();
    return;
  }
  document.getElementById('registerOverlay').classList.add('active');
}

function closeRegisterModal() {
  document.getElementById('registerOverlay').classList.remove('active');
}

function toggleRegisterSubmit() {
  const cb = document.getElementById('regPrivacy');
  const btn = document.getElementById('regSubmitBtn');
  if (!cb || !btn) return;
  btn.disabled = !cb.checked;
  btn.style.opacity = cb.checked ? '1' : '0.4';
  btn.style.cursor = cb.checked ? 'pointer' : 'not-allowed';
}

async function handleRegister(event) {
  event.preventDefault();
  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const school = document.getElementById('regSchool').value.trim();

  if (!name || !email) return false;

  try {
    await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name, email, school,
        planType: 'rubric',
        timestamp: new Date().toISOString()
      })
    });
  } catch (err) {
    console.warn('Registration failed:', err);
  }

  sessionStorage.setItem('cymru_registered', '1');
  closeRegisterModal();
  performRubricDownload();
  return false;
}

function performRubricDownload() {
  window.print();
}

// Close modals on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeSwmPicker();
    closeRegisterModal();
  }
});
