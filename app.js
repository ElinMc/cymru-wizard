// ============================================================
// BANTANI CYMRU CURRICULUM WIZARD — Application Logic
// ============================================================

const D = CurriculumData;

// ---- State ----
let currentStep = 0;
const wizardSteps = [
  { id: 'setting',    label: 'Setting',        icon: '📍' },
  { id: 'purpose',    label: 'Purpose',         icon: '🎯' },
  { id: 'area',       label: 'Area',            icon: '📖' },
  { id: 'statements', label: 'What Matters',    icon: '💡' },
  { id: 'skills',     label: 'Skills',          icon: '🔗' },
  { id: 'teaching',   label: 'Teaching Method', icon: '🏗️' },
  { id: 'assessment', label: 'Assessment',      icon: '📋' },
  { id: 'plan',       label: 'Lesson Plan',     icon: '✨' }
];

const selections = {
  setting: { topic: '', age: '', duration: '', context: '' },
  purposes: [],
  areas: [],
  statements: [],
  skills: [],
  teachingMethods: [],
  assessmentMethods: [],
  inclusionNeeds: [],
  inclusionDetails: ''
};

// ALN (Additional Learning Needs) categories for Wales
const ALN_CATEGORIES = [
  { id: 'dyslexia', label: 'Dyslexia', icon: '📖' },
  { id: 'dyscalculia', label: 'Dyscalculia', icon: '🔢' },
  { id: 'dyspraxia', label: 'Dyspraxia / DCD', icon: '✋' },
  { id: 'adhd', label: 'ADHD / ADD', icon: '⚡' },
  { id: 'autism', label: 'Autism / ASD', icon: '🧩' },
  { id: 'visual', label: 'Visual impairment', icon: '👁️' },
  { id: 'hearing', label: 'Hearing impairment', icon: '👂' },
  { id: 'physical', label: 'Physical disabilities', icon: '♿' },
  { id: 'speech', label: 'Speech & language difficulties', icon: '💬' },
  { id: 'semh', label: 'Social, emotional & mental health (SEMH)', icon: '💚' },
  { id: 'eal', label: 'English/Welsh as Additional Language', icon: '🌍' },
  { id: 'mat', label: 'More able & talented (MAT)', icon: '⭐' },
  { id: 'mld', label: 'Moderate learning difficulties', icon: '📚' }
];

// ---- Initialization ----
document.addEventListener('DOMContentLoaded', () => {
  renderProgressSteps();
  renderWizardStep();
  renderExploreGrid();
  updateNav();
});

// ---- View Switching ----
function switchView(view) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById(`view-${view}`).classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.querySelector(`[data-view="${view}"]`).classList.add('active');
}

// ---- Progress Bar ----
function renderProgressSteps() {
  const container = document.getElementById('progressSteps');
  container.innerHTML = wizardSteps.map((s, i) =>
    `<div class="progress-step-label ${i === currentStep ? 'active' : ''} ${i < currentStep ? 'completed' : ''}" 
          onclick="goToStep(${i})">${s.icon} ${s.label}</div>`
  ).join('');

  const fill = document.getElementById('progressFill');
  fill.style.width = `${((currentStep) / (wizardSteps.length - 1)) * 100}%`;
}

function goToStep(step) {
  if (step <= currentStep || step <= getMaxAllowedStep()) {
    currentStep = step;
    renderProgressSteps();
    renderWizardStep();
    updateNav();
  }
}

function getMaxAllowedStep() {
  // Allow going back to any completed step
  return currentStep;
}

// ---- Wizard Navigation ----
function wizardNext() {
  if (currentStep < wizardSteps.length - 1) {
    currentStep++;
    renderProgressSteps();
    renderWizardStep();
    updateNav();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function wizardPrev() {
  if (currentStep > 0) {
    currentStep--;
    renderProgressSteps();
    renderWizardStep();
    updateNav();
  }
}

function updateNav() {
  const btnPrev = document.getElementById('btnPrev');
  const btnNext = document.getElementById('btnNext');
  const indicator = document.getElementById('stepIndicator');

  btnPrev.disabled = currentStep === 0;

  if (currentStep === wizardSteps.length - 1) {
    btnNext.textContent = '🎉 Generate Plan';
    btnNext.onclick = generateLessonPlan;
  } else {
    btnNext.innerHTML = 'Next →';
    btnNext.onclick = wizardNext;
  }

  indicator.textContent = `Step ${currentStep + 1} of ${wizardSteps.length}`;
}

// ---- Render Wizard Steps ----
function renderWizardStep() {
  const container = document.getElementById('wizardStepContainer');
  const step = wizardSteps[currentStep];

  switch (step.id) {
    case 'setting':     container.innerHTML = renderSettingStep(); break;
    case 'purpose':     container.innerHTML = renderPurposeStep(); break;
    case 'area':        container.innerHTML = renderAreaStep(); break;
    case 'statements':  container.innerHTML = renderStatementsStep(); break;
    case 'skills':      container.innerHTML = renderSkillsStep(); break;
    case 'teaching':    container.innerHTML = renderTeachingStep(); break;
    case 'assessment':  container.innerHTML = renderAssessmentStep(); break;
    case 'plan':        container.innerHTML = renderPlanPreviewStep(); break;
  }

  // Rebind event listeners for forms
  if (step.id === 'setting') {
    bindSettingForm();
  }
}

// ---- Step Renderers ----

function renderSettingStep() {
  const s = selections.setting;
  return `
    <div class="wizard-step">
      <div class="step-header">
        <div class="step-number">1</div>
        <h2>Set the Scene</h2>
        <p>Describe your learning context. This helps shape the lesson plan.</p>
      </div>
      <div class="setting-form">
        <div class="form-group">
          <label>📝 Topic or Theme</label>
          <input type="text" id="settingTopic" placeholder="e.g. Climate change in Wales, The Mabinogion, Local river ecosystems…" value="${s.topic}">
        </div>
        <div class="form-group">
          <label>👥 Progression Step / Age Range</label>
          <select id="settingAge">
            <option value="">Select progression step…</option>
            ${D.progressionSteps.map(p =>
              `<option value="${p.step}" ${s.age == p.step ? 'selected' : ''}>
                Step ${p.step}: ${p.description} (ages ${p.ages})
              </option>`
            ).join('')}
          </select>
        </div>
        <div class="form-group">
          <label>⏰ Duration</label>
          <select id="settingDuration">
            <option value="">Select duration…</option>
            <option value="single" ${s.duration === 'single' ? 'selected' : ''}>Single lesson (1 hour)</option>
            <option value="double" ${s.duration === 'double' ? 'selected' : ''}>Double lesson (2 hours)</option>
            <option value="halfday" ${s.duration === 'halfday' ? 'selected' : ''}>Half day</option>
            <option value="fullday" ${s.duration === 'fullday' ? 'selected' : ''}>Full day</option>
            <option value="week" ${s.duration === 'week' ? 'selected' : ''}>Week-long project</option>
            <option value="term" ${s.duration === 'term' ? 'selected' : ''}>Half-term / Term project</option>
          </select>
        </div>
        <div class="form-group">
          <label>🏫 Additional Context (optional)</label>
          <textarea id="settingContext" placeholder="Any specific considerations: outdoor learning, bilingual setting, cross-phase, inclusion needs…">${s.context}</textarea>
        </div>
      </div>
    </div>
  `;
}

function bindSettingForm() {
  const fields = ['settingTopic', 'settingAge', 'settingDuration', 'settingContext'];
  const keys = ['topic', 'age', 'duration', 'context'];
  fields.forEach((id, i) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', () => { selections.setting[keys[i]] = el.value; });
      el.addEventListener('change', () => { selections.setting[keys[i]] = el.value; });
    }
  });
}

function renderPurposeStep() {
  return `
    <div class="wizard-step">
      <div class="step-header">
        <div class="step-number">2</div>
        <h2>Choose Purpose(s)</h2>
        <p>Select which of the Four Purposes this learning experience will primarily support. You can select multiple.</p>
      </div>
      <div class="card-grid">
        ${D.purposes.map(p => renderCard({
          id: p.id,
          icon: p.icon,
          title: p.title,
          subtitle: p.subtitle,
          desc: p.characteristics.slice(0, 3).join(' · '),
          color: p.color,
          category: 'Four Purposes',
          selected: selections.purposes.includes(p.id),
          onClick: `toggleSelection('purposes', '${p.id}')`,
          onDetail: `showPurposeDetail('${p.id}')`
        })).join('')}
      </div>
      <p class="hint">Click a card to select it. Click the card title area to see full details.</p>
    </div>
  `;
}

function renderAreaStep() {
  return `
    <div class="wizard-step">
      <div class="step-header">
        <div class="step-number">3</div>
        <h2>Select Area(s) of Learning</h2>
        <p>Choose which Areas of Learning and Experience your lesson will draw from. Cross-curricular connections are encouraged!</p>
      </div>
      ${renderSelectionSummary()}
      <div class="card-grid">
        ${D.areas.map(a => renderCard({
          id: a.id,
          icon: a.icon,
          title: a.title,
          subtitle: a.disciplines,
          desc: a.introduction,
          color: a.color,
          category: 'Area of Learning & Experience',
          selected: selections.areas.includes(a.id),
          onClick: `toggleSelection('areas', '${a.id}')`,
          onDetail: `showAreaDetail('${a.id}')`
        })).join('')}
      </div>
    </div>
  `;
}

function renderStatementsStep() {
  const selectedAreas = D.areas.filter(a => selections.areas.includes(a.id));
  if (selectedAreas.length === 0) {
    return `
      <div class="wizard-step">
        <div class="step-header">
          <div class="step-number">4</div>
          <h2>Statements of What Matters</h2>
          <p>Please go back and select at least one Area of Learning first.</p>
        </div>
        <div class="empty-state">
          <div class="empty-state-icon">📖</div>
          <p>No Areas selected yet. Go back to Step 3 to choose Areas.</p>
        </div>
      </div>
    `;
  }

  const statementCards = selectedAreas.flatMap(area =>
    area.statementsOfWhatMatters.map(s => ({
      ...s,
      areaId: area.id,
      areaTitle: area.title,
      areaColor: area.color,
      areaIcon: area.icon
    }))
  );

  return `
    <div class="wizard-step">
      <div class="step-header">
        <div class="step-number">4</div>
        <h2>Statements of What Matters</h2>
        <p>These are the 'big ideas' of your selected Areas. Choose which ones your lesson will engage with.</p>
      </div>
      ${renderSelectionSummary()}
      <div class="card-grid card-grid-compact">
        ${statementCards.map(s => renderCard({
          id: s.id,
          icon: s.areaIcon,
          title: s.title,
          subtitle: '',
          desc: s.summary,
          color: s.areaColor,
          category: s.areaTitle,
          selected: selections.statements.includes(s.id),
          onClick: `toggleSelection('statements', '${s.id}')`,
          onDetail: `showStatementDetail('${s.id}', '${s.areaId}')`
        })).join('')}
      </div>
    </div>
  `;
}

function renderSkillsStep() {
  return `
    <div class="wizard-step">
      <div class="step-header">
        <div class="step-number">5</div>
        <h2>Cross-Curricular Skills</h2>
        <p>Select cross-curricular skills to embed in this learning experience. These mandatory skills should be developed across all Areas.</p>
      </div>
      ${renderSelectionSummary()}
      <div class="card-grid">
        ${D.crossCurricularSkills.map(s => renderCard({
          id: s.id,
          icon: s.icon,
          title: s.title,
          subtitle: '',
          desc: s.description,
          color: s.color,
          category: 'Cross-Curricular Skill',
          selected: selections.skills.includes(s.id),
          onClick: `toggleSelection('skills', '${s.id}')`,
          onDetail: `showSkillDetail('${s.id}')`
        })).join('')}
      </div>
      <h3 style="margin-top:2rem;margin-bottom:1rem;font-size:1.1rem;">Wider Skills</h3>
      <div class="card-grid card-grid-compact">
        ${D.widerSkills.map(s => renderCard({
          id: s.id,
          icon: s.icon,
          title: s.title,
          subtitle: '',
          desc: s.description,
          color: '#5D6D7E',
          category: 'Wider Skill',
          selected: selections.skills.includes(s.id),
          onClick: `toggleSelection('skills', '${s.id}')`,
          onDetail: null
        })).join('')}
      </div>
    </div>
  `;
}

function renderTeachingStep() {
  return `
    <div class="wizard-step">
      <div class="step-header">
        <div class="step-number">6</div>
        <h2>Teaching Method(s)</h2>
        <p>Choose teaching approaches for this learning experience. Inspired by the SCAFFOLD framework, adapted for Wales.</p>
      </div>
      ${renderSelectionSummary()}
      <div class="card-grid">
        ${D.teachingMethods.map(m => renderCard({
          id: m.id,
          icon: m.icon,
          title: m.title,
          subtitle: m.abbrev,
          desc: m.description,
          color: m.color,
          category: 'Teaching Method',
          selected: selections.teachingMethods.includes(m.id),
          onClick: `toggleSelection('teachingMethods', '${m.id}')`,
          onDetail: `showTeachingDetail('${m.id}')`
        })).join('')}
      </div>
    </div>
  `;
}

function renderAssessmentStep() {
  return `
    <div class="wizard-step">
      <div class="step-header">
        <div class="step-number">7</div>
        <h2>Assessment Method(s)</h2>
        <p>Select assessment approaches to support learner progression. Choose methods that align with your teaching approach.</p>
      </div>
      ${renderSelectionSummary()}
      <div class="card-grid">
        ${D.assessmentMethods.map(m => renderCard({
          id: m.id,
          icon: m.icon,
          title: m.title,
          subtitle: '',
          desc: m.description,
          color: m.color,
          category: 'Assessment Method',
          selected: selections.assessmentMethods.includes(m.id),
          onClick: `toggleSelection('assessmentMethods', '${m.id}')`,
          onDetail: `showAssessmentDetail('${m.id}')`
        })).join('')}
      </div>
    </div>
  `;
}

function renderPlanPreviewStep() {
  return `
    <div class="wizard-step">
      <div class="step-header">
        <div class="step-number">8</div>
        <h2>Review & Generate</h2>
        <p>Review your selections below, then generate your lesson plan.</p>
      </div>
      ${renderFullSummary()}
      <div style="text-align:center; margin-top:2rem;">
        <button class="btn btn-primary" onclick="generateLessonPlan()" style="font-size:1.1rem; padding:0.85rem 2rem;">
          ✨ Generate Lesson Plan
        </button>
      </div>
    </div>
  `;
}

// ---- Card Renderer ----
function renderCard({ id, icon, title, subtitle, desc, color, category, selected, onClick, onDetail }) {
  return `
    <div class="card ${selected ? 'selected' : ''}" 
         style="--card-color: ${color}" 
         onclick="${onClick}">
      <span class="card-icon">${icon}</span>
      <span class="card-area-label" style="color:${color}">${category}</span>
      <div class="card-title" ${onDetail ? `onclick="event.stopPropagation(); ${onDetail}"` : ''}
           style="${onDetail ? 'cursor:pointer;' : ''}">${title}</div>
      ${subtitle ? `<div style="font-size:0.75rem;color:${color};font-weight:500;margin-bottom:0.35rem;">${subtitle}</div>` : ''}
      <div class="card-desc">${desc}</div>
    </div>
  `;
}

// ---- Selection Toggling ----
function toggleSelection(category, id) {
  const arr = selections[category];
  const idx = arr.indexOf(id);
  if (idx >= 0) {
    arr.splice(idx, 1);
  } else {
    arr.push(id);
  }
  renderWizardStep();
}

// ---- Selection Summary ----
function renderSelectionSummary() {
  const chips = [];

  selections.purposes.forEach(id => {
    const p = D.purposes.find(x => x.id === id);
    if (p) chips.push(`<span class="selection-chip" style="background:${p.color}">${p.icon} ${p.title}</span>`);
  });

  selections.areas.forEach(id => {
    const a = D.areas.find(x => x.id === id);
    if (a) chips.push(`<span class="selection-chip" style="background:${a.color}">${a.icon} ${a.title}</span>`);
  });

  if (chips.length === 0) return '';
  return `<div class="selection-summary">Selected: ${chips.join('')}</div>`;
}

function renderFullSummary() {
  const s = selections;
  let html = '<div style="max-width:600px;margin:0 auto;">';

  // Setting
  html += `<div class="lesson-plan-section">
    <h3>📍 Setting</h3>
    <div class="plan-card" style="border-left-color:var(--welsh-green)">
      <div class="plan-card-title">${s.setting.topic || 'No topic specified'}</div>
      <div class="plan-card-desc">
        ${s.setting.age ? `Step ${s.setting.age} · ` : ''}
        ${durationLabel(s.setting.duration)}
        ${s.setting.context ? ` · ${s.setting.context}` : ''}
      </div>
    </div>
  </div>`;

  // Purposes
  if (s.purposes.length) {
    html += `<div class="lesson-plan-section"><h3>🎯 Purposes</h3>`;
    s.purposes.forEach(id => {
      const p = D.purposes.find(x => x.id === id);
      if (p) html += `<div class="plan-card" style="border-left-color:${p.color}"><div class="plan-card-title">${p.icon} ${p.title}</div><div class="plan-card-desc">${p.subtitle}</div></div>`;
    });
    html += `</div>`;
  }

  // Areas
  if (s.areas.length) {
    html += `<div class="lesson-plan-section"><h3>📖 Areas of Learning</h3>`;
    s.areas.forEach(id => {
      const a = D.areas.find(x => x.id === id);
      if (a) html += `<div class="plan-card" style="border-left-color:${a.color}"><div class="plan-card-title">${a.icon} ${a.title}</div><div class="plan-card-desc">${a.disciplines}</div></div>`;
    });
    html += `</div>`;
  }

  // Statements
  if (s.statements.length) {
    html += `<div class="lesson-plan-section"><h3>💡 Statements of What Matters</h3>`;
    s.statements.forEach(id => {
      const stmt = findStatement(id);
      if (stmt) html += `<div class="plan-card" style="border-left-color:${stmt.areaColor}"><div class="plan-card-title">${stmt.title}</div><div class="plan-card-desc">${stmt.summary}</div></div>`;
    });
    html += `</div>`;
  }

  // Skills
  if (s.skills.length) {
    html += `<div class="lesson-plan-section"><h3>🔗 Skills</h3>`;
    s.skills.forEach(id => {
      const skill = D.crossCurricularSkills.find(x => x.id === id) || D.widerSkills.find(x => x.id === id);
      if (skill) html += `<div class="plan-card" style="border-left-color:${skill.color || '#5D6D7E'}"><div class="plan-card-title">${skill.icon} ${skill.title}</div></div>`;
    });
    html += `</div>`;
  }

  // Teaching
  if (s.teachingMethods.length) {
    html += `<div class="lesson-plan-section"><h3>🏗️ Teaching Methods</h3>`;
    s.teachingMethods.forEach(id => {
      const m = D.teachingMethods.find(x => x.id === id);
      if (m) html += `<div class="plan-card" style="border-left-color:${m.color}"><div class="plan-card-title">${m.icon} ${m.title}</div><div class="plan-card-desc">${m.description.substring(0, 120)}…</div></div>`;
    });
    html += `</div>`;
  }

  // Assessment
  if (s.assessmentMethods.length) {
    html += `<div class="lesson-plan-section"><h3>📋 Assessment Methods</h3>`;
    s.assessmentMethods.forEach(id => {
      const m = D.assessmentMethods.find(x => x.id === id);
      if (m) html += `<div class="plan-card" style="border-left-color:${m.color}"><div class="plan-card-title">${m.icon} ${m.title}</div><div class="plan-card-desc">${m.approach.substring(0, 120)}…</div></div>`;
    });
    html += `</div>`;
  }

  html += '</div>';
  return html;
}

// ---- Generate Lesson Plan ----
function generateLessonPlan() {
  const s = selections;
  const overlay = document.getElementById('lessonPlanOverlay');
  const body = document.getElementById('lessonPlanBody');

  const purposes = s.purposes.map(id => D.purposes.find(x => x.id === id)).filter(Boolean);
  const areas = s.areas.map(id => D.areas.find(x => x.id === id)).filter(Boolean);
  const statements = s.statements.map(id => findStatement(id)).filter(Boolean);
  const skills = s.skills.map(id => D.crossCurricularSkills.find(x => x.id === id) || D.widerSkills.find(x => x.id === id)).filter(Boolean);
  const teaching = s.teachingMethods.map(id => D.teachingMethods.find(x => x.id === id)).filter(Boolean);
  const assessment = s.assessmentMethods.map(id => D.assessmentMethods.find(x => x.id === id)).filter(Boolean);

  const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  let html = `<div class="lesson-plan">
    <div style="text-align:center;margin-bottom:1.5rem;">
      <img src="logo.jpg" alt="Bantani Cymru" style="height:40px;margin-bottom:0.5rem;">
      <h2>Curriculum Planning Card — Lesson Plan</h2>
      <p style="color:var(--text-light);font-size:0.85rem;">Generated ${today} · Curriculum for Wales 2022</p>
    </div>

    <h3>📍 Learning Context</h3>
    <div class="plan-card" style="border-left-color:var(--welsh-green)">
      <div class="plan-card-title">${s.setting.topic || 'Topic not specified'}</div>
      <div class="plan-card-desc">
        <strong>Progression Step:</strong> ${s.setting.age ? `Step ${s.setting.age} (${D.progressionSteps.find(p => p.step == s.setting.age)?.description || ''})` : 'Not specified'}<br>
        <strong>Duration:</strong> ${durationLabel(s.setting.duration)}<br>
        ${s.setting.context ? `<strong>Context:</strong> ${s.setting.context}` : ''}
      </div>
    </div>`;

  if (purposes.length) {
    html += `<h3>🎯 Four Purposes</h3>`;
    purposes.forEach(p => {
      html += `<div class="plan-card" style="border-left-color:${p.color}">
        <div class="plan-card-title">${p.icon} ${p.title}</div>
        <div class="plan-card-desc">${p.subtitle}<br><em>Key characteristics:</em> ${p.characteristics.slice(0,3).join(' · ')}</div>
      </div>`;
    });
  }

  if (areas.length) {
    html += `<h3>📖 Areas of Learning & Experience</h3>`;
    areas.forEach(a => {
      html += `<div class="plan-card" style="border-left-color:${a.color}">
        <div class="plan-card-title">${a.icon} ${a.title}</div>
        <div class="plan-card-desc">${a.disciplines}</div>
      </div>`;
    });
  }

  if (statements.length) {
    html += `<h3>💡 Statements of What Matters</h3>`;
    statements.forEach(st => {
      html += `<div class="plan-card" style="border-left-color:${st.areaColor}">
        <div class="plan-card-title">${st.title}</div>
        <div class="plan-card-desc">${st.summary}<br><em>${st.description.substring(0, 200)}…</em></div>
      </div>`;
    });
  }

  if (skills.length) {
    html += `<h3>🔗 Cross-Curricular & Wider Skills</h3>`;
    skills.forEach(sk => {
      html += `<div class="plan-card" style="border-left-color:${sk.color || '#5D6D7E'}">
        <div class="plan-card-title">${sk.icon} ${sk.title}</div>
        <div class="plan-card-desc">${sk.description}</div>
      </div>`;
    });
  }

  if (teaching.length) {
    html += `<h3>🏗️ Teaching Methods</h3>`;
    teaching.forEach(m => {
      html += `<div class="plan-card" style="border-left-color:${m.color}">
        <div class="plan-card-title">${m.icon} ${m.title} (${m.abbrev})</div>
        <div class="plan-card-desc">${m.description}
          <br><br><strong>Steps:</strong>
          <ol style="margin-top:0.5rem;padding-left:1.25rem;">
            ${m.steps.map(s => `<li>${s}</li>`).join('')}
          </ol>
          <br><strong>Welsh context:</strong> ${m.welshContext}
        </div>
      </div>`;
    });
  }

  if (assessment.length) {
    html += `<h3>📋 Assessment Methods</h3>`;
    assessment.forEach(m => {
      html += `<div class="plan-card" style="border-left-color:${m.color}">
        <div class="plan-card-title">${m.icon} ${m.title}</div>
        <div class="plan-card-desc">${m.description}
          <br><br><strong>Approach:</strong> ${m.approach}
          <br><strong>Welsh context:</strong> ${m.welshContext}
        </div>
      </div>`;
    });
  }

  // Assessment Principles reminder
  html += `<h3>📐 Assessment Principles (Curriculum for Wales)</h3>
    <div class="plan-card" style="border-left-color:var(--welsh-green)">
      <div class="plan-card-desc">
        <ul>
          ${D.assessmentPrinciples.map(p => `<li>${p}</li>`).join('')}
        </ul>
      </div>
    </div>`;

  // Notes section
  html += `<h3>📝 Practitioner Notes</h3>
    <div class="plan-card" style="border-left-color:#ccc;min-height:120px;">
      <div class="plan-card-desc" contenteditable="true" style="min-height:100px;outline:none;color:var(--text-light);">
        Click here to add your own notes, differentiation strategies, resources needed, and next steps…
      </div>
    </div>`;

  html += `<div class="plan-action-buttons">
    <button class="btn btn-download" onclick="requestDownload('pdf')">📄 Download Lesson Plan (PDF)</button>
    <button class="btn btn-ai" onclick="generateAIActivities()">✨ Generate Activity Ideas with AI</button>
  </div>
  <div class="plan-action-buttons" style="margin-top:0.5rem;">
    <button class="btn btn-primary" onclick="window.print()">🖨️ Print Plan</button>
    <button class="btn btn-secondary" onclick="copyPlanText()">📋 Copy as Text</button>
    <button class="btn btn-secondary" onclick="closeLessonPlan()">Close</button>
  </div>
  <div id="aiSection"></div>`;

  html += `</div>`;

  body.innerHTML = html;
  overlay.classList.add('active');
}

function closeLessonPlan() {
  document.getElementById('lessonPlanOverlay').classList.remove('active');
}

function copyPlanText() {
  const body = document.getElementById('lessonPlanBody');
  const text = body.innerText;
  navigator.clipboard.writeText(text).then(() => {
    alert('Lesson plan copied to clipboard!');
  }).catch(() => {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    alert('Lesson plan copied to clipboard!');
  });
}

// ---- Detail Modals ----
function showModal(html) {
  const overlay = document.getElementById('modalOverlay');
  const body = document.getElementById('modalBody');
  body.innerHTML = html;
  overlay.classList.add('active');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
}

function showPurposeDetail(id) {
  const p = D.purposes.find(x => x.id === id);
  if (!p) return;
  showModal(`
    <div class="modal-card-header" style="border-bottom-color:${p.color}">
      <span class="modal-card-icon">${p.icon}</span>
      <div>
        <div class="modal-card-title">${p.title}</div>
        <div class="modal-card-category" style="color:${p.color}">${p.subtitle}</div>
      </div>
    </div>
    <div class="modal-section">
      <h4>Key Characteristics</h4>
      <ul>
        ${p.characteristics.map(c => `<li>${c}</li>`).join('')}
      </ul>
    </div>
  `);
}

function showAreaDetail(id) {
  const a = D.areas.find(x => x.id === id);
  if (!a) return;
  showModal(`
    <div class="modal-card-header" style="border-bottom-color:${a.color}">
      <span class="modal-card-icon">${a.icon}</span>
      <div>
        <div class="modal-card-title">${a.title}</div>
        <div class="modal-card-category" style="color:${a.color}">Area of Learning & Experience</div>
      </div>
    </div>
    <div class="modal-section">
      <h4>Disciplines</h4>
      <p>${a.disciplines}</p>
    </div>
    <div class="modal-section">
      <h4>Introduction</h4>
      <p>${a.introduction}</p>
    </div>
    <div class="modal-section">
      <h4>Statements of What Matters (${a.statementsOfWhatMatters.length})</h4>
      <ul>
        ${a.statementsOfWhatMatters.map(s => `<li><strong>${s.title}</strong> — ${s.summary}</li>`).join('')}
      </ul>
    </div>
  `);
}

function showStatementDetail(stmtId, areaId) {
  const area = D.areas.find(x => x.id === areaId);
  if (!area) return;
  const s = area.statementsOfWhatMatters.find(x => x.id === stmtId);
  if (!s) return;

  const goodWithHtml = (s.goodWith || []).map(gw => {
    const purpose = D.purposes.find(p => p.id === gw);
    if (purpose) return `<span class="good-with-tag" style="background:${purpose.color};color:white;">${purpose.icon} ${purpose.title}</span>`;
    const stmt = findStatement(gw);
    if (stmt) return `<span class="good-with-tag" style="background:${stmt.areaColor};color:white;">${stmt.title}</span>`;
    return '';
  }).filter(Boolean).join('');

  showModal(`
    <div class="modal-card-header" style="border-bottom-color:${area.color}">
      <span class="modal-card-icon">${area.icon}</span>
      <div>
        <div class="modal-card-title">${s.title}</div>
        <div class="modal-card-category" style="color:${area.color}">${area.title} · Statement of What Matters</div>
      </div>
    </div>
    <div class="modal-section">
      <h4>Summary</h4>
      <p>${s.summary}</p>
    </div>
    <div class="modal-section">
      <h4>Description</h4>
      <p>${s.description}</p>
    </div>
    ${goodWithHtml ? `<div class="modal-section"><h4>Good With</h4><div class="good-with-tags">${goodWithHtml}</div></div>` : ''}
  `);
}

function showSkillDetail(id) {
  const s = D.crossCurricularSkills.find(x => x.id === id);
  if (!s) return;
  showModal(`
    <div class="modal-card-header" style="border-bottom-color:${s.color}">
      <span class="modal-card-icon">${s.icon}</span>
      <div>
        <div class="modal-card-title">${s.title}</div>
        <div class="modal-card-category" style="color:${s.color}">Cross-Curricular Skill</div>
      </div>
    </div>
    <div class="modal-section">
      <h4>Description</h4>
      <p>${s.description}</p>
    </div>
    <div class="modal-section">
      <h4>Elements</h4>
      <ul>
        ${s.elements.map(e => `<li>${e}</li>`).join('')}
      </ul>
    </div>
  `);
}

function showTeachingDetail(id) {
  const m = D.teachingMethods.find(x => x.id === id);
  if (!m) return;

  const goodWithHtml = (m.goodWith || []).map(gw => {
    const purpose = D.purposes.find(p => p.id === gw);
    if (purpose) return `<span class="good-with-tag" style="background:${purpose.color};color:white;">${purpose.icon} ${purpose.title}</span>`;
    const stmt = findStatement(gw);
    if (stmt) return `<span class="good-with-tag" style="background:${stmt.areaColor};color:white;">${stmt.title}</span>`;
    return '';
  }).filter(Boolean).join('');

  const methodsHtml = (m.goodWithMethods || []).map(mid => {
    const method = D.teachingMethods.find(x => x.id === mid);
    if (method) return `<span class="good-with-tag" style="background:${method.color};color:white;">${method.icon} ${method.title}</span>`;
    return '';
  }).filter(Boolean).join('');

  showModal(`
    <div class="modal-card-header" style="border-bottom-color:${m.color}">
      <span class="modal-card-icon">${m.icon}</span>
      <div>
        <div class="modal-card-title">${m.title} (${m.abbrev})</div>
        <div class="modal-card-category" style="color:${m.color}">Teaching Method</div>
      </div>
    </div>
    <div class="modal-section">
      <h4>Description</h4>
      <p>${m.description}</p>
    </div>
    <div class="modal-section">
      <h4>Steps</h4>
      <ol>
        ${m.steps.map(s => `<li>${s}</li>`).join('')}
      </ol>
    </div>
    <div class="modal-section">
      <h4>🏴󠁧󠁢󠁷󠁬󠁳󠁿 Welsh Context</h4>
      <p>${m.welshContext}</p>
    </div>
    ${goodWithHtml ? `<div class="modal-section"><h4>Good with (Purposes & Statements)</h4><div class="good-with-tags">${goodWithHtml}</div></div>` : ''}
    ${methodsHtml ? `<div class="modal-section"><h4>Pairs well with</h4><div class="good-with-tags">${methodsHtml}</div></div>` : ''}
  `);
}

function showAssessmentDetail(id) {
  const m = D.assessmentMethods.find(x => x.id === id);
  if (!m) return;

  const goodWithHtml = (m.goodWith || []).map(gw => {
    const purpose = D.purposes.find(p => p.id === gw);
    if (purpose) return `<span class="good-with-tag" style="background:${purpose.color};color:white;">${purpose.icon} ${purpose.title}</span>`;
    const method = D.teachingMethods.find(x => x.id === gw);
    if (method) return `<span class="good-with-tag" style="background:${method.color};color:white;">${method.icon} ${method.title}</span>`;
    return '';
  }).filter(Boolean).join('');

  showModal(`
    <div class="modal-card-header" style="border-bottom-color:${m.color}">
      <span class="modal-card-icon">${m.icon}</span>
      <div>
        <div class="modal-card-title">${m.title}</div>
        <div class="modal-card-category" style="color:${m.color}">Assessment Method</div>
      </div>
    </div>
    <div class="modal-section">
      <h4>Description</h4>
      <p>${m.description}</p>
    </div>
    <div class="modal-section">
      <h4>Approach</h4>
      <p>${m.approach}</p>
    </div>
    <div class="modal-section">
      <h4>🏴󠁧󠁢󠁷󠁬󠁳󠁿 Welsh Context</h4>
      <p>${m.welshContext}</p>
    </div>
    ${goodWithHtml ? `<div class="modal-section"><h4>Good With</h4><div class="good-with-tags">${goodWithHtml}</div></div>` : ''}
  `);
}

// ---- Explore View ----
function renderExploreGrid(filter = 'all') {
  const grid = document.getElementById('exploreGrid');
  let cards = [];

  if (filter === 'all' || filter === 'purposes') {
    D.purposes.forEach(p => cards.push(renderExploreCard({
      icon: p.icon, title: p.title, desc: p.subtitle + '. ' + p.characteristics.slice(0,2).join(' · '),
      color: p.color, category: 'Four Purposes', detailFn: `showPurposeDetail('${p.id}')`
    })));
  }

  if (filter === 'all' || filter === 'areas') {
    D.areas.forEach(a => {
      cards.push(renderExploreCard({
        icon: a.icon, title: a.title, desc: a.introduction,
        color: a.color, category: 'Area of Learning & Experience', detailFn: `showAreaDetail('${a.id}')`
      }));
      a.statementsOfWhatMatters.forEach(s => {
        cards.push(renderExploreCard({
          icon: a.icon, title: s.title, desc: s.summary,
          color: a.color, category: `${a.title} · SWM`, detailFn: `showStatementDetail('${s.id}', '${a.id}')`
        }));
      });
    });
  }

  if (filter === 'all' || filter === 'cross') {
    D.crossCurricularSkills.forEach(s => cards.push(renderExploreCard({
      icon: s.icon, title: s.title, desc: s.description,
      color: s.color, category: 'Cross-Curricular Skill', detailFn: `showSkillDetail('${s.id}')`
    })));
    D.widerSkills.forEach(s => cards.push(renderExploreCard({
      icon: s.icon, title: s.title, desc: s.description,
      color: '#5D6D7E', category: 'Wider Skill', detailFn: null
    })));
  }

  if (filter === 'all' || filter === 'teaching') {
    D.teachingMethods.forEach(m => cards.push(renderExploreCard({
      icon: m.icon, title: m.title, desc: m.description,
      color: m.color, category: 'Teaching Method', detailFn: `showTeachingDetail('${m.id}')`
    })));
  }

  if (filter === 'all' || filter === 'assessment') {
    D.assessmentMethods.forEach(m => cards.push(renderExploreCard({
      icon: m.icon, title: m.title, desc: m.description,
      color: m.color, category: 'Assessment Method', detailFn: `showAssessmentDetail('${m.id}')`
    })));
  }

  grid.innerHTML = cards.join('');
}

function renderExploreCard({ icon, title, desc, color, category, detailFn }) {
  return `
    <div class="card" style="--card-color:${color}" ${detailFn ? `onclick="${detailFn}"` : ''}>
      <span class="card-icon">${icon}</span>
      <span class="card-area-label" style="color:${color}">${category}</span>
      <div class="card-title">${title}</div>
      <div class="card-desc">${desc}</div>
    </div>
  `;
}

function filterCards(filter, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderExploreGrid(filter);
}

// ---- Helpers ----
function findStatement(id) {
  for (const area of D.areas) {
    const s = area.statementsOfWhatMatters.find(x => x.id === id);
    if (s) return { ...s, areaId: area.id, areaTitle: area.title, areaColor: area.color, areaIcon: area.icon };
  }
  return null;
}

function durationLabel(val) {
  const map = {
    single: 'Single lesson (1 hour)',
    double: 'Double lesson (2 hours)',
    halfday: 'Half day',
    fullday: 'Full day',
    week: 'Week-long project',
    term: 'Half-term / Term project'
  };
  return map[val] || 'Not specified';
}

// ---- AI Activity Generation ----
let aiGeneratedText = '';
let aiActivitiesData = []; // Parsed activities for expandable view

// ---- Inclusion Modal ----
function showInclusionModal() {
  const overlay = document.getElementById('inclusionOverlay');
  if (overlay) {
    // Reset state
    document.getElementById('inclusionToggle').checked = selections.inclusionNeeds.length > 0;
    toggleInclusionOptions();
    overlay.classList.add('active');
  }
}

function closeInclusionModal() {
  document.getElementById('inclusionOverlay').classList.remove('active');
}

function toggleInclusionOptions() {
  const toggle = document.getElementById('inclusionToggle');
  const options = document.getElementById('inclusionOptions');
  if (toggle && options) {
    options.style.display = toggle.checked ? 'block' : 'none';
  }
}

function toggleInclusionNeed(id) {
  const idx = selections.inclusionNeeds.indexOf(id);
  if (idx >= 0) {
    selections.inclusionNeeds.splice(idx, 1);
  } else {
    selections.inclusionNeeds.push(id);
  }
  renderInclusionCheckboxes();
}

function renderInclusionCheckboxes() {
  const container = document.getElementById('inclusionCheckboxes');
  if (!container) return;
  container.innerHTML = ALN_CATEGORIES.map(cat => `
    <label class="inclusion-checkbox ${selections.inclusionNeeds.includes(cat.id) ? 'checked' : ''}">
      <input type="checkbox" 
             ${selections.inclusionNeeds.includes(cat.id) ? 'checked' : ''} 
             onchange="toggleInclusionNeed('${cat.id}')">
      <span>${cat.icon} ${cat.label}</span>
    </label>
  `).join('');
}

function handleInclusionContinue() {
  // Save any additional details
  const details = document.getElementById('inclusionDetails');
  if (details) {
    selections.inclusionDetails = details.value.trim();
  }
  closeInclusionModal();
  // Now proceed to email capture or AI generation
  proceedToAIGeneration();
}

function proceedToAIGeneration() {
  // Check if already registered this session
  if (!sessionStorage.getItem('cymru_registered')) {
    pendingDownloadType = 'ai';
    document.getElementById('registerOverlay').classList.add('active');
    return;
  }
  doGenerateAIActivities();
}

function gatherPlanContext() {
  const s = selections;
  const purposes = s.purposes.map(id => D.purposes.find(x => x.id === id)).filter(Boolean);
  const areas = s.areas.map(id => D.areas.find(x => x.id === id)).filter(Boolean);
  const statements = s.statements.map(id => findStatement(id)).filter(Boolean);
  const skills = s.skills.map(id => D.crossCurricularSkills.find(x => x.id === id) || D.widerSkills.find(x => x.id === id)).filter(Boolean);
  const teaching = s.teachingMethods.map(id => D.teachingMethods.find(x => x.id === id)).filter(Boolean);
  const assessment = s.assessmentMethods.map(id => D.assessmentMethods.find(x => x.id === id)).filter(Boolean);
  const inclusionNeeds = s.inclusionNeeds.map(id => ALN_CATEGORIES.find(x => x.id === id)).filter(Boolean);

  let context = `TOPIC: ${s.setting.topic || 'Not specified'}\n`;
  context += `PROGRESSION STEP: ${s.setting.age ? `Step ${s.setting.age}` : 'Not specified'}\n`;
  context += `DURATION: ${durationLabel(s.setting.duration)}\n`;
  if (s.setting.context) context += `CONTEXT: ${s.setting.context}\n`;
  context += `\nFOUR PURPOSES:\n${purposes.map(p => `- ${p.title}: ${p.subtitle}`).join('\n')}\n`;
  context += `\nAREAS OF LEARNING:\n${areas.map(a => `- ${a.title}: ${a.disciplines}`).join('\n')}\n`;
  context += `\nSTATEMENTS OF WHAT MATTERS:\n${statements.map(st => `- ${st.title}: ${st.summary}`).join('\n')}\n`;
  context += `\nCROSS-CURRICULAR SKILLS:\n${skills.map(sk => `- ${sk.title}: ${sk.description}`).join('\n')}\n`;
  context += `\nTEACHING METHODS:\n${teaching.map(m => `- ${m.title}: ${m.description}`).join('\n')}\n`;
  context += `\nASSESSMENT METHODS:\n${assessment.map(m => `- ${m.title}: ${m.description}`).join('\n')}\n`;

  // Include ALN/inclusion needs
  if (inclusionNeeds.length > 0) {
    context += `\nINCLUSION / ADDITIONAL LEARNING NEEDS:\n`;
    context += `The teacher has indicated they need to accommodate learners with:\n`;
    context += inclusionNeeds.map(n => `- ${n.label}`).join('\n') + '\n';
    if (s.inclusionDetails) {
      context += `Additional details: ${s.inclusionDetails}\n`;
    }
  }

  return context;
}

async function generateAIActivities() {
  // First show inclusion modal to ask about ALN needs
  showInclusionModal();
  renderInclusionCheckboxes();
}

async function doGenerateAIActivities() {
  const section = document.getElementById('aiSection');
  section.innerHTML = `
    <div class="ai-section">
      <div class="ai-loading">
        <div class="spinner"></div>
        <p class="shimmer-text">Generating creative activity ideas with AI…</p>
        <p style="margin-top:0.5rem;font-size:0.8rem;">This may take a moment ✨</p>
      </div>
    </div>`;
  section.scrollIntoView({ behavior: 'smooth', block: 'start' });

  try {
    const context = gatherPlanContext();
    const hasInclusionNeeds = selections.inclusionNeeds.length > 0;
    
    const resp = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ context, includeDetailedFormat: true, hasInclusionNeeds })
    });

    if (!resp.ok) {
      const err = await resp.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to generate activities');
    }

    const data = await resp.json();
    aiGeneratedText = data.activities;
    aiActivitiesData = parseActivitiesStructured(data.activities);
    displayAIActivities(data.activities);
  } catch (err) {
    section.innerHTML = `
      <div class="ai-section">
        <h3>⚠️ Generation Error</h3>
        <p style="color:var(--text-light);">Sorry, we couldn't generate activities right now. ${err.message}</p>
        <button class="btn btn-ai" onclick="doGenerateAIActivities()" style="margin-top:1rem;">🔄 Try Again</button>
      </div>`;
  }
}

function displayAIActivities(text) {
  const section = document.getElementById('aiSection');
  const activities = aiActivitiesData.length > 0 ? aiActivitiesData : parseActivitiesStructured(text);

  let html = `
    <div class="ai-section">
      <h3>✨ AI-Generated Activity Ideas</h3>
      <p class="ai-section-subtitle">Select the activities you'd like to see in detail, then click "Show Details" below.</p>
      <div class="activity-cards-expandable">`;

  if (activities.length > 0) {
    activities.forEach((activity, idx) => {
      html += `
        <div class="activity-card-expandable" data-idx="${idx}">
          <div class="activity-card-header">
            <label class="activity-checkbox">
              <input type="checkbox" id="actCheck${idx}" onchange="updateExpandButton()">
              <span class="checkmark"></span>
            </label>
            <div class="activity-card-title-area" onclick="toggleActivityPreview(${idx})">
              <h4>${activity.title}</h4>
              <p class="activity-overview">${activity.overview || activity.description || ''}</p>
            </div>
            <button class="activity-toggle-btn" onclick="toggleActivityPreview(${idx})" title="Preview">
              <span class="toggle-icon">▼</span>
            </button>
          </div>
          <div class="activity-card-preview" id="actPreview${idx}" style="display:none;">
            <div class="activity-preview-content">
              ${activity.description ? `<p>${activity.description}</p>` : ''}
            </div>
          </div>
          <div class="activity-card-details" id="actDetails${idx}" style="display:none;">
            ${renderActivityDetails(activity)}
          </div>
        </div>`;
    });
  } else {
    // Fallback: render as formatted text
    html += `<div class="activity-card"><div style="white-space:pre-wrap;font-size:0.85rem;line-height:1.65;">${escapeHtml(text)}</div></div>`;
  }

  html += `</div>
    <div class="plan-action-buttons" style="margin-top:1rem;">
      <button class="btn btn-primary" id="showDetailsBtn" onclick="showSelectedDetails()" disabled>
        📋 Show Details for Selected
      </button>
      <button class="btn btn-secondary" onclick="selectAllActivities()">Select All</button>
    </div>
    <div class="plan-action-buttons" style="margin-top:0.75rem;">
      <button class="btn btn-download" onclick="requestDownload('ai-enhanced')">📥 Download Enhanced Plan</button>
      <button class="btn btn-ai" onclick="generateAIActivities()">🔄 Regenerate</button>
    </div>
  </div>`;

  section.innerHTML = html;
}

function renderActivityDetails(activity) {
  let html = '<div class="activity-details-content">';
  
  // Full description
  if (activity.fullDescription) {
    html += `<div class="detail-section">
      <h5>📝 Full Description</h5>
      <p>${activity.fullDescription}</p>
    </div>`;
  }
  
  // Curriculum alignment
  if (activity.curriculumAlignment) {
    html += `<div class="detail-section">
      <h5>🎯 How It Delivers on Your Curriculum Selections</h5>
      <p>${activity.curriculumAlignment}</p>
    </div>`;
  }
  
  // Inclusion adaptations (only if there are ALN needs)
  if (activity.inclusionAdaptations && selections.inclusionNeeds.length > 0) {
    html += `<div class="detail-section">
      <h5>♿ Inclusion & Differentiation</h5>
      <p>${activity.inclusionAdaptations}</p>
    </div>`;
  }
  
  // Welsh context
  if (activity.welshContext) {
    html += `<div class="detail-section">
      <h5>🏴󠁧󠁢󠁷󠁬󠁳󠁿 Welsh Language & Culture</h5>
      <p>${activity.welshContext}</p>
    </div>`;
  }
  
  // Resources
  if (activity.resources) {
    html += `<div class="detail-section">
      <h5>📦 Resources Needed</h5>
      <p>${activity.resources}</p>
    </div>`;
  }
  
  html += '</div>';
  return html;
}

function toggleActivityPreview(idx) {
  const preview = document.getElementById(`actPreview${idx}`);
  const btn = document.querySelector(`[data-idx="${idx}"] .toggle-icon`);
  if (preview.style.display === 'none') {
    preview.style.display = 'block';
    if (btn) btn.textContent = '▲';
  } else {
    preview.style.display = 'none';
    if (btn) btn.textContent = '▼';
  }
}

function updateExpandButton() {
  const checkboxes = document.querySelectorAll('.activity-card-expandable input[type="checkbox"]:checked');
  const btn = document.getElementById('showDetailsBtn');
  if (btn) {
    btn.disabled = checkboxes.length === 0;
    btn.textContent = checkboxes.length > 0 
      ? `📋 Show Details for ${checkboxes.length} Selected` 
      : '📋 Show Details for Selected';
  }
}

function selectAllActivities() {
  const checkboxes = document.querySelectorAll('.activity-card-expandable input[type="checkbox"]');
  const allChecked = Array.from(checkboxes).every(cb => cb.checked);
  checkboxes.forEach(cb => cb.checked = !allChecked);
  updateExpandButton();
}

function showSelectedDetails() {
  const cards = document.querySelectorAll('.activity-card-expandable');
  cards.forEach((card, idx) => {
    const checkbox = document.getElementById(`actCheck${idx}`);
    const details = document.getElementById(`actDetails${idx}`);
    const preview = document.getElementById(`actPreview${idx}`);
    if (checkbox && checkbox.checked && details) {
      details.style.display = 'block';
      if (preview) preview.style.display = 'none';
      card.classList.add('expanded');
    }
  });
  
  // Scroll to first expanded card
  const firstExpanded = document.querySelector('.activity-card-expandable.expanded');
  if (firstExpanded) {
    firstExpanded.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function parseActivitiesStructured(text) {
  // Parse the AI response into structured activity objects
  const activities = [];
  
  // Split on ## headers (activity titles)
  const blocks = text.split(/\n(?=##\s+)/);
  
  for (const block of blocks) {
    const trimmed = block.trim();
    if (!trimmed || !trimmed.startsWith('##')) continue;
    
    const lines = trimmed.split('\n');
    // Extract title from ## header
    let title = lines[0].replace(/^##\s*/, '').trim();
    if (!title || title.length < 3) continue;
    
    const activity = {
      title: title,
      overview: '',
      description: '',
      fullDescription: '',
      curriculumAlignment: '',
      inclusionAdaptations: '',
      welshContext: '',
      resources: ''
    };
    
    const content = lines.slice(1).join('\n');
    
    // Extract bold sections with more flexible matching
    // **Overview:**
    const overviewMatch = content.match(/\*\*Overview:\*\*\s*([\s\S]*?)(?=\*\*[A-Z]|\n---|\n##|$)/i);
    if (overviewMatch) activity.overview = cleanMarkdown(overviewMatch[1]).substring(0, 250);
    
    // **Full Description:**
    const fullDescMatch = content.match(/\*\*Full Description:\*\*\s*([\s\S]*?)(?=\*\*[A-Z]|\n---|\n##|$)/i);
    if (fullDescMatch) activity.fullDescription = cleanMarkdown(fullDescMatch[1]);
    
    // **How It Delivers on Your Curriculum Selections:**
    const currMatch = content.match(/\*\*How It Delivers[^*]*:\*\*\s*([\s\S]*?)(?=\*\*[A-Z]|\n---|\n##|$)/i);
    if (currMatch) activity.curriculumAlignment = cleanMarkdown(currMatch[1]);
    
    // **Inclusion & Differentiation:** or **Differentiation Tips:**
    const inclMatch = content.match(/\*\*(?:Inclusion|Differentiation)[^*]*:\*\*\s*([\s\S]*?)(?=\*\*[A-Z]|\n---|\n##|$)/i);
    if (inclMatch) activity.inclusionAdaptations = cleanMarkdown(inclMatch[1]);
    
    // **Welsh Language & Culture:**
    const welshMatch = content.match(/\*\*Welsh[^*]*:\*\*\s*([\s\S]*?)(?=\*\*[A-Z]|\n---|\n##|$)/i);
    if (welshMatch) activity.welshContext = cleanMarkdown(welshMatch[1]);
    
    // **Resources Needed:**
    const resMatch = content.match(/\*\*Resources[^*]*:\*\*\s*([\s\S]*?)(?=\*\*[A-Z]|\n---|\n##|$)/i);
    if (resMatch) activity.resources = cleanMarkdown(resMatch[1]);
    
    // Fallback: if no sections found, try numbered format
    if (!activity.overview && !activity.fullDescription) {
      // Try to match numbered items like "1." or bullet points
      const descLines = content.split('\n').filter(l => l.trim());
      if (descLines.length > 0) {
        activity.overview = cleanMarkdown(descLines[0]).substring(0, 250);
        activity.fullDescription = cleanMarkdown(descLines.slice(0, 4).join('\n'));
      }
    }
    
    // Only add if we got meaningful content
    if (activity.overview || activity.fullDescription) {
      activities.push(activity);
    }
  }
  
  // Fallback: try splitting on numbered headers (1. / 2. etc)
  if (activities.length === 0) {
    const numberedBlocks = text.split(/\n(?=\d+[\.\)]\s+)/);
    for (const block of numberedBlocks) {
      const trimmed = block.trim();
      if (!trimmed) continue;
      
      const lines = trimmed.split('\n');
      let title = lines[0].replace(/^\d+[\.\)]\s*/, '').replace(/\*\*/g, '').trim();
      if (!title || title.length < 3) continue;
      
      const activity = {
        title: title,
        overview: '',
        description: '',
        fullDescription: '',
        curriculumAlignment: '',
        inclusionAdaptations: '',
        welshContext: '',
        resources: ''
      };
      
      const content = lines.slice(1).filter(l => l.trim()).join('\n');
      activity.overview = cleanMarkdown(content).substring(0, 250);
      activity.fullDescription = cleanMarkdown(content);
      
      activities.push(activity);
    }
  }
  
  return activities;
}

function cleanMarkdown(text) {
  if (!text) return '';
  return text
    .replace(/\*\*([^*]+)\*\*/g, '$1')  // Remove bold
    .replace(/\*([^*]+)\*/g, '$1')      // Remove italic
    .replace(/^[-•]\s*/gm, '')          // Remove bullet points
    .replace(/^\d+\.\s*/gm, '')         // Remove numbered lists
    .replace(/\n{3,}/g, '\n\n')         // Normalize line breaks
    .trim();
}

function parseActivities(text) {
  // Try to split on numbered headers like "1." "2." or "## " or "**1."
  const blocks = text.split(/\n(?=(?:\d+[\.\)]\s|#{1,3}\s|(?:\*\*\d|\*\*[^\*]+\*\*\n)))/);
  const cards = [];

  for (const block of blocks) {
    const trimmed = block.trim();
    if (!trimmed) continue;
    const lines = trimmed.split('\n');
    let title = lines[0].replace(/^[\d\.\)\#\*\s]+/, '').replace(/\*\*/g, '').trim();
    if (!title || title.length < 3) continue;

    const content = lines.slice(1)
      .map(l => l.trim())
      .filter(l => l.length > 0)
      .map(l => l.replace(/^\*\*([^*]+)\*\*:?/, '<strong>$1</strong>:').replace(/^[-•]\s*/, ''));

    cards.push({ title, content });
  }

  return cards;
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ---- Registration / Email Capture ----
let pendingDownloadType = null;

function requestDownload(type) {
  // Check if already registered this session
  if (sessionStorage.getItem('cymru_registered')) {
    performDownload(type);
    return;
  }
  pendingDownloadType = type;
  document.getElementById('registerOverlay').classList.add('active');
}

function closeRegisterModal() {
  document.getElementById('registerOverlay').classList.remove('active');
  pendingDownloadType = null;
  // Reset checkbox and button state
  const cb = document.getElementById('regPrivacy');
  if (cb) cb.checked = false;
  toggleRegisterSubmit();
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

  if (!name || !email) return;

  try {
    await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        school,
        planType: pendingDownloadType || 'pdf',
        timestamp: new Date().toISOString()
      })
    });
  } catch (err) {
    console.warn('Registration failed:', err);
  }

  sessionStorage.setItem('cymru_registered', '1');
  const wasAI = pendingDownloadType === 'ai';
  closeRegisterModal();
  if (wasAI) {
    doGenerateAIActivities();
  } else if (pendingDownloadType) {
    performDownload(pendingDownloadType);
    pendingDownloadType = null;
  }
}

function performDownload(type) {
  if (type === 'ai-enhanced' && aiGeneratedText) {
    downloadEnhancedPlan();
  } else {
    downloadPDF();
  }
}

function downloadPDF() {
  // Use browser print to PDF
  window.print();
}

function downloadEnhancedPlan() {
  // Build a text version including AI activities
  const planBody = document.getElementById('lessonPlanBody');
  let text = planBody.innerText;

  if (aiGeneratedText) {
    text += '\n\n========================================\n';
    text += 'AI-GENERATED ACTIVITY IDEAS\n';
    text += '========================================\n\n';
    text += aiGeneratedText;
  }

  // Download as text file
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `cymru-lesson-plan-enhanced-${new Date().toISOString().split('T')[0]}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Close modals on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
    closeLessonPlan();
    closeRegisterModal();
  }
});
