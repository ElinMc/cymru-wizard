// Bantani Cymru Curriculum Wizard — Curriculum for Wales 2022 Data
// Extracted from the official Curriculum for Wales guidance (252 pages)

const CurriculumData = {

  // ============================================================
  // FOUR PURPOSES
  // ============================================================
  purposes: [
    {
      id: "ambitious",
      title: "Ambitious, Capable Learners",
      subtitle: "Ready to learn throughout their lives",
      color: "#1a5276",
      icon: "🎯",
      characteristics: [
        "Set themselves high standards and seek and enjoy challenge",
        "Are building up a body of knowledge and have the skills to connect and apply that knowledge in different contexts",
        "Are questioning and enjoy solving problems",
        "Can communicate effectively in different forms and settings, using both Welsh and English",
        "Can explain the ideas and concepts they are learning about",
        "Can use number effectively in different contexts",
        "Understand how to interpret data and apply mathematical concepts",
        "Use digital technologies creatively to communicate, find and analyse information",
        "Undertake research and evaluate critically what they find"
      ]
    },
    {
      id: "enterprising",
      title: "Enterprising, Creative Contributors",
      subtitle: "Ready to play a full part in life and work",
      color: "#6c3483",
      icon: "💡",
      characteristics: [
        "Connect and apply their knowledge and skills to create ideas and products",
        "Think creatively to reframe and solve problems",
        "Identify and grasp opportunities",
        "Take measured risks",
        "Lead and play different roles in teams effectively and responsibly",
        "Express ideas and emotions through different media",
        "Give of their energy and skills so that other people will benefit"
      ]
    },
    {
      id: "ethical",
      title: "Ethical, Informed Citizens",
      subtitle: "Of Wales and the world",
      color: "#1e8449",
      icon: "🌍",
      characteristics: [
        "Find, evaluate and use evidence in forming views",
        "Engage with contemporary issues based upon their knowledge and values",
        "Understand and exercise their human and democratic responsibilities and rights",
        "Understand and consider the impact of their actions when making choices and acting",
        "Are knowledgeable about their culture, community, society and the world, now and in the past",
        "Respect the needs and rights of others, as a member of a diverse society",
        "Show their commitment to the sustainability of the planet"
      ]
    },
    {
      id: "healthy",
      title: "Healthy, Confident Individuals",
      subtitle: "Ready to lead fulfilling lives as valued members of society",
      color: "#c0392b",
      icon: "❤️",
      characteristics: [
        "Have secure values and are establishing their spiritual and ethical beliefs",
        "Are building their mental and emotional well-being by developing confidence, resilience and empathy",
        "Apply knowledge about the impact of diet and exercise on physical and mental health in their daily lives",
        "Know how to find the information and support to keep safe and well",
        "Take part in physical activity",
        "Take measured decisions about lifestyle and manage risk",
        "Have the confidence to participate in performance",
        "Form positive relationships based upon trust and mutual respect",
        "Face and overcome challenge",
        "Have the skills and knowledge to manage everyday life as independently as they can"
      ]
    }
  ],

  // ============================================================
  // INTEGRAL SKILLS (underpinning the four purposes)
  // ============================================================
  integralSkills: [
    {
      id: "creativity",
      title: "Creativity & Innovation",
      description: "Be curious and inquisitive, generate many ideas, link and connect disparate experiences, knowledge and skills, explore and justify alternative solutions, and create different types of value.",
      icon: "✨"
    },
    {
      id: "critical-thinking",
      title: "Critical Thinking & Problem-Solving",
      description: "Ask meaningful questions, evaluate information and evidence, analyse and justify possible solutions, become objective in decision-making, and propose solutions which generate different types of value.",
      icon: "🔍"
    },
    {
      id: "personal-effectiveness",
      title: "Personal Effectiveness",
      description: "Develop emotional intelligence and awareness, become confident and independent, lead debate and discussions, evaluate learning and mistakes, and become responsible and reliable.",
      icon: "⭐"
    },
    {
      id: "planning-organising",
      title: "Planning & Organising",
      description: "Set goals, make decisions and monitor interim results, reflect and adapt, manage time, people and resources, and check for accuracy.",
      icon: "📋"
    }
  ],

  // ============================================================
  // SIX AREAS OF LEARNING AND EXPERIENCE
  // ============================================================
  areas: [
    {
      id: "expressive-arts",
      title: "Expressive Arts",
      color: "#8E44AD",
      lightColor: "#F5EEF8",
      borderColor: "#6C3483",
      icon: "🎭",
      disciplines: "Art, dance, drama, film & digital media, music",
      introduction: "The Expressive Arts Area brings together five disciplines: art, dance, drama, film and digital media, and music. Together they draw on and develop learners' creativity and their ability to express and communicate ideas and emotions.",
      statementsOfWhatMatters: [
        {
          id: "ea-swm1",
          title: "Exploring the Expressive Arts",
          summary: "Exploring the expressive arts is essential to developing artistic skills and knowledge and it enables learners to become curious and creative individuals.",
          description: "By exploring forms and disciplines in the expressive arts, whether through experimentation, play or formal research and inquiry, learners can develop an understanding of how the expressive arts communicate through visual, physical, verbal, musical and technological means. This exploration can also progress their understanding of how the expressive arts shape ideas and feelings. It can encourage them to develop their imagination and draw upon their own experiences, skills and talents to become creative artists themselves. The expressive arts are also a powerful medium through which learners can explore Wales and its unique traditions and diverse cultures.",
          goodWith: ["ethical", "enterprising", "ea-swm2", "ea-swm3"]
        },
        {
          id: "ea-swm2",
          title: "Responding & Reflecting",
          summary: "Responding and reflecting, both as artist and audience, is a fundamental part of learning in the expressive arts.",
          description: "Responding within the expressive arts engages the emotions and the intellect. Response may be a simple sensory reaction to artistic stimulus or a critical analysis of creative work. Adopting the skills and critical vocabulary encountered in this Area can equip learners to consider creative work in a range of media, forms, genres and styles. The act of responding challenges learners to reflect on the effectiveness of their own work and that of others.",
          goodWith: ["ambitious", "healthy", "ea-swm1", "ea-swm3"]
        },
        {
          id: "ea-swm3",
          title: "Creating",
          summary: "Creating combines skills and knowledge, drawing on the senses, inspiration and imagination.",
          description: "By engaging with this Area, learners will be given opportunities to be innovative and bold, to create individual work and to develop their own identity as artists in Wales. This learning and experience can foster resilience and flexibility to overcome challenges. Creating in the expressive arts embraces a range of creative disciplines and provides opportunities for learners to use their knowledge, imagination and creative skill to communicate thoughts and ideas.",
          goodWith: ["enterprising", "ambitious", "ea-swm1", "ea-swm2"]
        }
      ]
    },
    {
      id: "health-wellbeing",
      title: "Health & Well-being",
      color: "#E74C3C",
      lightColor: "#FDEDEC",
      borderColor: "#C0392B",
      icon: "💪",
      disciplines: "Physical education, health education, PSE, relationships & sexuality education",
      introduction: "The Health and Well-being Area is designed to support learners in developing the knowledge, skills and dispositions to manage their physical, mental and emotional health and well-being, now and in the future.",
      statementsOfWhatMatters: [
        {
          id: "hw-swm1",
          title: "Physical Health & Well-being",
          summary: "Developing physical health and well-being has lifelong benefits.",
          description: "This Area can help learners to understand the factors that affect physical health and well-being. This includes health-promoting behaviours such as physical activity, balanced diet, personal care and hygiene, sleep, and protection from infection. Learners will be encouraged to develop the confidence, motivation, physical competence, knowledge and understanding that can help them lead healthy and active lifestyles.",
          goodWith: ["healthy", "ambitious", "hw-swm2", "hw-swm3"]
        },
        {
          id: "hw-swm2",
          title: "Mental Health & Emotional Well-being",
          summary: "How we process and respond to our experiences affects our mental health and emotional well-being.",
          description: "This Area can help learners explore the connections between their experiences, mental health and emotional well-being. Learners can be enabled to recognise that feelings and emotions are neither fixed nor consistent. Having an awareness of our own feelings and emotions is the foundation upon which empathy can be developed. Supporting learners to develop strategies which help them to regulate their emotions can contribute towards good mental health and emotional well-being.",
          goodWith: ["healthy", "ethical", "hw-swm1", "hw-swm5"]
        },
        {
          id: "hw-swm3",
          title: "Decision-Making",
          summary: "Our decision-making impacts on the quality of our lives and the lives of others.",
          description: "This Area can help learners to understand how decisions are made and how different decisions can have different consequences. It helps learners develop a critical and considered approach to risk, including understanding how to manage and mitigate risks. A key decision that affects learners for life is around their career pathways.",
          goodWith: ["ambitious", "ethical", "hw-swm1", "hw-swm4"]
        },
        {
          id: "hw-swm4",
          title: "Social Influences",
          summary: "How we engage with social influences shapes who we are and affects our health and well-being.",
          description: "This Area can help learners understand the important role of social influences on their lives. These influences are comprised of rules, social norms, attitudes and values that are created and reinforced by different social groups. They affect our identity, values, behaviours and health and well-being, and often do so without our being aware of it. Learners will need to engage critically with these social influences.",
          goodWith: ["ethical", "healthy", "hw-swm2", "hw-swm5"]
        },
        {
          id: "hw-swm5",
          title: "Healthy Relationships",
          summary: "Healthy relationships are fundamental to our well-being.",
          description: "This Area can help learners understand and value how feelings of belonging and connection that come from healthy relationships have a powerful effect on health and well-being. Learners need to recognise when relationships are unhealthy and need to be aware of how to keep safe. They will be encouraged to develop their abilities to form, nurture and maintain relationships.",
          goodWith: ["healthy", "ethical", "hw-swm2", "hw-swm4"]
        }
      ]
    },
    {
      id: "humanities",
      title: "Humanities",
      color: "#D68910",
      lightColor: "#FEF9E7",
      borderColor: "#B7950B",
      icon: "🏛️",
      disciplines: "Geography, history, religious education, business studies, social studies",
      introduction: "The Humanities Area encompasses geography, history, religious education, business studies and social studies. It encourages learners to explore and understand the human experience, both past and present, in Wales and the wider world.",
      statementsOfWhatMatters: [
        {
          id: "hu-swm1",
          title: "Enquiry, Exploration & Investigation",
          summary: "Enquiry, exploration and investigation inspire curiosity about the world, its past, present and future.",
          description: "The learners' journey through this Area will encourage enquiry and discovery, as they are challenged to be curious and to question, to think critically and to reflect upon evidence. An enquiring mind stimulates new and creative thinking, through which learners can gain a deeper understanding of the concepts underpinning humanities, and their application in local, national and global contexts.",
          goodWith: ["ambitious", "ethical", "hu-swm2", "hu-swm3"]
        },
        {
          id: "hu-swm2",
          title: "Events & Human Experiences",
          summary: "Events and human experiences are complex, and are perceived, interpreted and represented in different ways.",
          description: "We encounter and make sense of the world though a variety of events and experiences. Humanities encourages learners to critically review the ways these events and experiences are perceived, interpreted and represented. As they form their own informed viewpoints and recognise those of others, learners can also develop self-awareness.",
          goodWith: ["ethical", "ambitious", "hu-swm1", "hu-swm4"]
        },
        {
          id: "hu-swm3",
          title: "Our Natural World",
          summary: "Our natural world is diverse and dynamic, influenced by processes and human actions.",
          description: "Experiencing the wonder of the natural world can contribute to learners' spiritual development and sense of place. By learning how the natural world has been shaped by geological, biological and other natural processes, and by human activity, learners develop an understanding of the interconnections between the environment, communities and the economy.",
          goodWith: ["ethical", "healthy", "hu-swm1", "hu-swm4"]
        },
        {
          id: "hu-swm4",
          title: "Human Societies",
          summary: "Human societies are complex and diverse, and shaped by human actions and beliefs.",
          description: "An appreciation of identity, heritage and cynefin can influence learners emotionally and spiritually, and help build their sense of self and of belonging. Through an understanding of themselves, learners develop their own identity and an awareness of how they can shape the communities in which they live. Over time, places, communities and societies evolve, experiencing continuity and change.",
          goodWith: ["ethical", "healthy", "hu-swm2", "hu-swm3"]
        },
        {
          id: "hu-swm5",
          title: "Citizenship & Ethical Action",
          summary: "Informed, self-aware citizens engage with the challenges and opportunities that face humanity, and are able to take considered and ethical action.",
          description: "Experiences in this Area can help learners develop an understanding of their responsibilities as citizens of Wales and the wider interconnected world, and of the importance of creating a just and sustainable future. Exploration of the humanities encourages learners to be active, informed, and responsible citizens who can engage with past, contemporary and anticipated challenges and opportunities.",
          goodWith: ["ethical", "enterprising", "hu-swm2", "hu-swm4"]
        }
      ]
    },
    {
      id: "languages",
      title: "Languages, Literacy & Communication",
      color: "#2E86C1",
      lightColor: "#EBF5FB",
      borderColor: "#1B6CA3",
      icon: "📚",
      disciplines: "Welsh, English, international languages, literacy, literature",
      introduction: "This Area is designed to equip learners, as citizens of a bilingual Wales in a multilingual world, with the ability to use Welsh, English and international languages. It develops literacy skills and a love of literature.",
      statementsOfWhatMatters: [
        {
          id: "la-swm1",
          title: "Languages Connect Us",
          summary: "Languages connect us with people, places and communities.",
          description: "This Area is designed to equip learners, as citizens of a bilingual Wales in a multilingual world, with the ability to use Welsh, English and international languages. Meaningful learning experiences in a multilingual context go hand in hand with learning about one's own cultural identity as well as the cultural identities of others.",
          goodWith: ["ethical", "enterprising", "la-swm2", "la-swm3"]
        },
        {
          id: "la-swm2",
          title: "Understanding Languages",
          summary: "Understanding languages is key to understanding the world around us.",
          description: "Languages and literacy are fundamental to human communication. They enable us to make sense of what is heard, read and seen, and thus to develop our understanding, empathy and our ability to respond and to mediate effectively. Rich and varied experiences can improve learners' ability to become creative and enterprising in their use of Welsh, English and international languages.",
          goodWith: ["ambitious", "ethical", "la-swm1", "la-swm3"]
        },
        {
          id: "la-swm3",
          title: "Expressing Ourselves",
          summary: "Expressing ourselves through languages is key to communication.",
          description: "Clear and effective communication through spoken and written language is an important life skill. It calls for the ability to use and adapt language in a range of roles, genres, forms, media and styles. In a bilingual and multilingual context, this also calls for the ability to choose an appropriate language and to mediate.",
          goodWith: ["ambitious", "enterprising", "la-swm1", "la-swm4"]
        },
        {
          id: "la-swm4",
          title: "Literature & Creativity",
          summary: "Literature fires imagination and inspires creativity.",
          description: "Literature expands horizons. In all its forms it can inspire and motivate us, while also helping us to learn more about language and to develop skills in using language effectively and creatively. Engaging with literature helps learners explore identity, culture, empathy and the human condition.",
          goodWith: ["enterprising", "healthy", "la-swm2", "la-swm3"]
        }
      ]
    },
    {
      id: "maths",
      title: "Mathematics & Numeracy",
      color: "#1ABC9C",
      lightColor: "#E8F8F5",
      borderColor: "#148F77",
      icon: "🔢",
      disciplines: "Number, algebra, geometry, measurement, statistics, probability",
      introduction: "Mathematics and Numeracy develops learners' numerical reasoning and mathematical proficiency. It builds the mathematical knowledge and skills needed for everyday life and further study.",
      statementsOfWhatMatters: [
        {
          id: "ma-swm1",
          title: "The Number System",
          summary: "The number system is used to represent and compare relationships between numbers and quantities.",
          description: "Numbers are the symbol system for describing and comparing quantities. This will be the first abstract concept that learners meet in mathematics. Knowledge of, and competence in, number and quantities are fundamental to learners' confident participation in the world. Computational fluency is essential for problem-solving and progressing in all areas of learning.",
          goodWith: ["ambitious", "enterprising", "ma-swm2", "ma-swm3"]
        },
        {
          id: "ma-swm2",
          title: "Algebra",
          summary: "Algebra uses symbol systems to express the structure of mathematical relationships.",
          description: "Algebra is the study of structures abstracted from computations and relations, and provides a way to make generalisations. Algebraic thinking is essential for reasoning, modelling and solving problems in mathematics and in a wide range of real-world contexts, including technology and finance.",
          goodWith: ["ambitious", "enterprising", "ma-swm1", "ma-swm4"]
        },
        {
          id: "ma-swm3",
          title: "Geometry & Measurement",
          summary: "Geometry focuses on relationships involving shape, space and position, and measurement focuses on quantifying phenomena in the physical world.",
          description: "Geometry involves playing with, manipulating, comparing, naming and classifying shapes and structures. Measurement allows the magnitude of spatial and abstract features to be quantified. Reasoning about shapes and spaces helps learners to make sense of the physical world. Geometry and measurement have applications in art, construction, science and technology, engineering, and astronomy.",
          goodWith: ["ambitious", "enterprising", "ma-swm1", "ma-swm4"]
        },
        {
          id: "ma-swm4",
          title: "Statistics & Probability",
          summary: "Statistics represent data, probability models chance, and both support informed inferences and decisions.",
          description: "Statistics is the practice of collecting, manipulating and analysing data, allowing representation and generalisation of information. Understanding probability helps learners make sense of uncertainty. Statistical thinking is key to understanding and critically engaging with claims made in public debate and the media.",
          goodWith: ["ambitious", "ethical", "ma-swm1", "ma-swm2"]
        }
      ]
    },
    {
      id: "science-tech",
      title: "Science & Technology",
      color: "#2C3E50",
      lightColor: "#EBEDEF",
      borderColor: "#1C2833",
      icon: "🔬",
      disciplines: "Biology, chemistry, physics, computer science, design & technology",
      introduction: "The Science and Technology Area encompasses all the scientific and technological disciplines. It develops learners' curiosity and creativity through inquiry and experimentation, and builds their understanding of the world.",
      statementsOfWhatMatters: [
        {
          id: "st-swm1",
          title: "Curiosity & Scientific Knowledge",
          summary: "Being curious and searching for answers is essential to understanding and predicting phenomena.",
          description: "Curiosity about science and technology leads us to ask questions about the world around us. By being encouraged to use logic, evidence and creativity, learners will be supported to inquire into and apply scientific knowledge. Learners need to be able to evaluate scientific claims to help make informed decisions that affect our environment and well-being.",
          goodWith: ["ambitious", "ethical", "st-swm2", "st-swm4"]
        },
        {
          id: "st-swm2",
          title: "Design Thinking & Engineering",
          summary: "Design thinking and engineering offer technical and creative ways to meet society's needs and wants.",
          description: "By applying their experiences, skills and knowledge, learners can design and shape innovative engineered solutions. Being part of a user-centred design process will encourage them to use creativity to develop ideas, manage and mitigate risks, and minimise complexities.",
          goodWith: ["enterprising", "ambitious", "st-swm1", "st-swm3"]
        },
        {
          id: "st-swm3",
          title: "Living Things & Ecosystems",
          summary: "The world around us is full of living things which depend on each other for survival.",
          description: "By recognising the diversity of living things and how they interact with their environment, learners can develop an understanding of how these have evolved over significant periods of time. Knowing about the structures and functions of living things enables learners to understand how they grow, develop and reproduce successfully.",
          goodWith: ["ethical", "healthy", "st-swm1", "st-swm5"]
        },
        {
          id: "st-swm4",
          title: "Matter & the Universe",
          summary: "Matter and the way it behaves defines our universe and shapes our lives.",
          description: "The universe and all living things are made up of matter. Understanding the nature of matter can help learners appreciate the impact that chemistry has on the world around them. Chemical reactions happen continuously in our environment as well as in living things.",
          goodWith: ["ambitious", "enterprising", "st-swm1", "st-swm5"]
        },
        {
          id: "st-swm5",
          title: "Forces & Energy",
          summary: "Forces and energy provide a foundation for understanding our universe.",
          description: "Forces and energy can be used to describe the behaviour of everything from the smallest building blocks of matter to the motion of planets and stars. Understanding forces and energy helps us to predict and control the behaviour of our environment. An understanding can help learners overcome future challenges and use our planet's resources efficiently and sustainably.",
          goodWith: ["ambitious", "ethical", "st-swm3", "st-swm4"]
        },
        {
          id: "st-swm6",
          title: "Computation & Digital World",
          summary: "Computation is the foundation for our digital world.",
          description: "Computation involves algorithms processing data to solve a wide range of real-world problems. Computational processes have changed the way we live, work, study and interact. Learners need to know how digital technologies work and understand the legal, social and ethical consequences of technology use.",
          goodWith: ["ambitious", "enterprising", "st-swm1", "st-swm2"]
        }
      ]
    }
  ],

  // ============================================================
  // CROSS-CURRICULAR SKILLS
  // ============================================================
  crossCurricularSkills: [
    {
      id: "literacy",
      title: "Literacy",
      color: "#5B2C6F",
      lightColor: "#F4ECF7",
      icon: "📝",
      description: "Develop listening, reading, speaking and writing skills across all Areas of Learning and Experience.",
      elements: [
        "Oracy across the curriculum — speaking, listening and presenting",
        "Reading across the curriculum — decoding, comprehension, analysis",
        "Writing across the curriculum — composition, accuracy, purpose"
      ],
      goodWith: ["ambitious", "languages"]
    },
    {
      id: "numeracy",
      title: "Numeracy",
      color: "#117A65",
      lightColor: "#E8F6F3",
      icon: "📊",
      description: "Use numbers and solve problems in real-life situations across all Areas of Learning and Experience.",
      elements: [
        "Developing numerical reasoning",
        "Using number skills in context",
        "Using measuring skills in context",
        "Using data skills in context"
      ],
      goodWith: ["ambitious", "maths"]
    },
    {
      id: "digital-competence",
      title: "Digital Competence",
      color: "#1F618D",
      lightColor: "#EAF2F8",
      icon: "💻",
      description: "Be confident users of a range of technologies to help communicate effectively and make sense of the world.",
      elements: [
        "Citizenship — identity, health and well-being, digital rights and licensing, online behaviour and cyberbullying",
        "Interacting and collaborating — communication, collaboration, storing and sharing",
        "Producing — planning, sourcing, creating, evaluating and improving",
        "Data and computational thinking — problem solving, modelling, data and information literacy"
      ],
      goodWith: ["ambitious", "science-tech"]
    }
  ],

  // ============================================================
  // WIDER SKILLS FRAMEWORK
  // ============================================================
  widerSkills: [
    {
      id: "ws-creativity",
      title: "Creativity & Innovation",
      icon: "🎨",
      description: "Generate many ideas, link disparate experiences, explore and justify alternative solutions, and communicate strategies."
    },
    {
      id: "ws-critical",
      title: "Critical Thinking & Problem-Solving",
      icon: "🧠",
      description: "Ask meaningful questions, evaluate information and evidence, analyse possible solutions, and become objective in decision-making."
    },
    {
      id: "ws-personal",
      title: "Personal Effectiveness",
      icon: "💎",
      description: "Develop emotional intelligence and awareness, become confident and independent, lead debates and discussions."
    },
    {
      id: "ws-planning",
      title: "Planning & Organising",
      icon: "📐",
      description: "Set goals, make decisions, monitor results, reflect and adapt, manage time, people and resources."
    }
  ],

  // ============================================================
  // TEACHING METHODS (Adapted from SCAFFOLD for Welsh context)
  // ============================================================
  teachingMethods: [
    {
      id: "tm-pbl",
      title: "Project-Based Learning",
      abbrev: "PBL",
      color: "#E67E22",
      icon: "🏗️",
      description: "Learners develop knowledge and skills through projects based on real-world challenges and problems that matter to them, giving learning purpose and stimulating learners' autonomy.",
      steps: [
        "Identify and frame a real-world problem, question, or challenge",
        "Identify and sequence tasks to support sustained enquiry",
        "Generate and evaluate ideas",
        "Create a product to test, refine and present their work",
        "Reflect and celebrate their learning"
      ],
      welshContext: "Could focus on local Welsh community challenges, sustainability in Welsh landscapes, bilingual projects, or cultural heritage preservation.",
      goodWith: ["enterprising", "ethical", "hu-swm1", "st-swm2"],
      goodWithMethods: ["tm-cooperative", "tm-service"]
    },
    {
      id: "tm-learner-led",
      title: "Learner-Led Learning",
      abbrev: "LED",
      color: "#9B59B6",
      icon: "🧭",
      description: "Learners take ownership of their learning journey, setting goals, choosing paths, and reflecting on progress. The teacher becomes a facilitator who supports and guides rather than directs.",
      steps: [
        "Learners identify their own learning interests and goals",
        "Design their learning path with teacher support",
        "Engage in self-directed inquiry and exploration",
        "Monitor and adjust their progress",
        "Reflect on and share their learning"
      ],
      welshContext: "Supports the Curriculum for Wales principle of subsidiarity — empowering learners to take ownership within the national framework.",
      goodWith: ["ambitious", "healthy", "la-swm3", "hw-swm2"],
      goodWithMethods: ["tm-pbl", "tm-value-creation"]
    },
    {
      id: "tm-value-creation",
      title: "Value Creation Pedagogy",
      abbrev: "VCP",
      color: "#16A085",
      icon: "🌱",
      description: "Learners create something of value for others beyond the classroom. This could be a product, service, experience, or knowledge that benefits someone else in their community.",
      steps: [
        "Identify who could benefit from learners' efforts",
        "Explore needs and opportunities",
        "Design and create value for identified beneficiaries",
        "Deliver and share the created value",
        "Reflect on the impact and learning"
      ],
      welshContext: "Aligns with Welsh values of community (cynefin), creating value for local Welsh-speaking communities, or addressing Well-being of Future Generations goals.",
      goodWith: ["enterprising", "ethical", "hu-swm4", "hw-swm5"],
      goodWithMethods: ["tm-pbl", "tm-service"]
    },
    {
      id: "tm-cooperative",
      title: "Cooperative Learning",
      abbrev: "CL",
      color: "#3498DB",
      icon: "🤝",
      description: "Structured group learning where learners work together towards shared goals. Each member has a role and responsibility, and success depends on the contribution of all.",
      steps: [
        "Form diverse groups and assign roles",
        "Define shared learning goals and individual accountability",
        "Engage in structured collaborative tasks",
        "Support and learn from each other",
        "Reflect on group process and individual contribution"
      ],
      welshContext: "Supports bilingual collaboration, cross-phase planning between Welsh-medium and English-medium settings.",
      goodWith: ["enterprising", "healthy", "la-swm1", "hw-swm3"],
      goodWithMethods: ["tm-pbl", "tm-playful"]
    },
    {
      id: "tm-playful",
      title: "Seriously Playful Learning",
      abbrev: "SPL",
      color: "#E91E63",
      icon: "🎮",
      description: "Using play, games, and gamification to create engaging learning experiences. Play fosters creativity, risk-taking, and experimentation in a safe environment.",
      steps: [
        "Design playful learning challenges or games",
        "Set clear learning outcomes within the playful context",
        "Allow for experimentation and 'safe failure'",
        "Encourage creative problem-solving through play",
        "Debrief and connect play to learning objectives"
      ],
      welshContext: "Builds on the Foundation Phase ethos central to Welsh education. Can incorporate Welsh games, storytelling traditions (cyfarwydd), and cultural play.",
      goodWith: ["ambitious", "healthy", "ea-swm1", "ea-swm3"],
      goodWithMethods: ["tm-cooperative", "tm-laboratory"]
    },
    {
      id: "tm-laboratory",
      title: "Laboratory Learning",
      abbrev: "LL",
      color: "#795548",
      icon: "🧪",
      description: "Hands-on experimentation and investigation where learners test hypotheses, gather evidence, and draw conclusions. Learning through doing, making, and discovering.",
      steps: [
        "Pose a question or hypothesis",
        "Design an experiment or investigation",
        "Conduct the investigation, collecting data",
        "Analyse results and draw conclusions",
        "Communicate findings and reflect on the process"
      ],
      welshContext: "Can explore Wales' rich natural environment, local biodiversity, geological features, or technological innovations.",
      goodWith: ["ambitious", "enterprising", "st-swm1", "st-swm4"],
      goodWithMethods: ["tm-pbl", "tm-playful"]
    },
    {
      id: "tm-service",
      title: "Service Learning",
      abbrev: "SL",
      color: "#4CAF50",
      icon: "🌍",
      description: "Learners engage in meaningful community service that is integrated with academic learning. Service learning connects classroom knowledge to real community needs.",
      steps: [
        "Investigate community needs with learners",
        "Plan and prepare a service project",
        "Carry out meaningful service in the community",
        "Connect service experience to curriculum learning",
        "Reflect on the impact and personal growth"
      ],
      welshContext: "Connected to the Well-being of Future Generations (Wales) Act 2015, UN Convention on the Rights of the Child, and local community engagement.",
      goodWith: ["ethical", "healthy", "hu-swm4", "hw-swm5"],
      goodWithMethods: ["tm-pbl", "tm-value-creation"]
    }
  ],

  // ============================================================
  // ASSESSMENT METHODS (Adapted from SCAFFOLD for Welsh context)
  // ============================================================
  assessmentMethods: [
    {
      id: "am-peer",
      title: "Peer Feedback",
      color: "#FF9800",
      icon: "👥",
      description: "Learners provide constructive feedback to each other on their work, developing critical thinking and communication skills while supporting mutual learning.",
      approach: "Structure peer feedback with clear criteria linked to Statements of What Matters. Use sentence starters, success criteria checklists, or 'two stars and a wish' formats.",
      welshContext: "Supports bilingual feedback practices and collaborative learning culture valued in Welsh education.",
      goodWith: ["ambitious", "healthy", "tm-cooperative"]
    },
    {
      id: "am-self-reflection",
      title: "Self-Reflection",
      color: "#9C27B0",
      icon: "🪞",
      description: "Learners reflect on their own learning, progress, and development. They identify strengths, areas for growth, and set targets for improvement.",
      approach: "Use learning journals, reflection prompts linked to the Four Purposes, and regular self-assessment against progression steps. Encourage metacognitive thinking about how they learn.",
      welshContext: "Aligned with the Welsh curriculum's emphasis on learner agency and 'supporting every learner to make progress'.",
      goodWith: ["ambitious", "healthy", "tm-learner-led"]
    },
    {
      id: "am-portfolio",
      title: "Portfolio Evidence",
      color: "#00BCD4",
      icon: "📂",
      description: "Learners compile evidence of their learning over time, showcasing development, achievement, and progression across different contexts and Areas.",
      approach: "Curate a mix of work samples, reflections, photos, and artefacts. Map evidence to the Four Purposes and Statements of What Matters. Include learner commentary on progress.",
      welshContext: "Supports the Welsh assessment principle that 'assessment is intrinsic to curriculum design' and should show progression over time.",
      goodWith: ["ambitious", "enterprising", "tm-pbl"]
    },
    {
      id: "am-authentic",
      title: "Authentic Assessment",
      color: "#4CAF50",
      icon: "🎯",
      description: "Learners demonstrate their knowledge and skills through real-world tasks and challenges that have genuine purpose and audience beyond the classroom.",
      approach: "Design assessments that mirror real-life challenges. Include exhibitions, performances, community presentations, or published work. Assess process as well as product.",
      welshContext: "Reflects the Welsh curriculum's emphasis on meaningful learning and real-world application across Areas of Learning and Experience.",
      goodWith: ["enterprising", "ethical", "tm-pbl", "tm-service"]
    },
    {
      id: "am-observation",
      title: "Observation",
      color: "#607D8B",
      icon: "👁️",
      description: "Practitioners observe learners during activities to assess understanding, skills, engagement, and progress in real-time learning situations.",
      approach: "Use structured observation schedules linked to descriptions of learning. Note evidence of progression step indicators. Combine with questioning to probe understanding.",
      welshContext: "Central to Foundation Phase practice and valued throughout Welsh education as a formative assessment approach.",
      goodWith: ["healthy", "ambitious", "tm-playful"]
    },
    {
      id: "am-questions",
      title: "Questions for Learning",
      color: "#FF5722",
      icon: "❓",
      description: "Using targeted, open-ended questions to probe understanding, challenge thinking, and move learning forward. Questions are a powerful tool for formative assessment.",
      approach: "Plan key questions in advance linked to learning objectives. Use wait time, follow-up probes, and higher-order questioning. Connect to Bloom's taxonomy and the Four Purposes.",
      welshContext: "Supports the Welsh curriculum's enquiry-based approach and the principle that assessment should 'move learning forward'.",
      goodWith: ["ambitious", "ethical", "tm-laboratory"]
    },
    {
      id: "am-presentation",
      title: "Presentation & Performance",
      color: "#673AB7",
      icon: "🎤",
      description: "Learners communicate their learning through presentations, performances, exhibitions, or demonstrations to an audience.",
      approach: "Provide rubrics and success criteria. Include peer and audience feedback. Assess both content knowledge and communication skills. Allow for creative expression.",
      welshContext: "Supports the Expressive Arts Area and the Welsh curriculum's emphasis on communication in both Welsh and English.",
      goodWith: ["enterprising", "healthy", "tm-value-creation"]
    }
  ],

  // ============================================================
  // ASSESSMENT PRINCIPLES (from Curriculum for Wales guidance)
  // ============================================================
  assessmentPrinciples: [
    "Assessment should support every learner to make progress",
    "Assessment should focus on moving learning forward",
    "Assessment requires understanding what learning has already taken place",
    "Each learner should be challenged and supported appropriately",
    "It requires partnerships among all those involved, including the learner",
    "It should recognise individual learning needs and backgrounds",
    "It should encourage a holistic view of each learner's development",
    "Both practitioner and learner should understand how the learner learns"
  ],

  // ============================================================
  // PROGRESSION STEPS (broad age-related expectations)
  // ============================================================
  progressionSteps: [
    { step: 1, ages: "3–5", description: "Foundation / Early Years" },
    { step: 2, ages: "5–8", description: "Early Primary" },
    { step: 3, ages: "8–11", description: "Upper Primary" },
    { step: 4, ages: "11–14", description: "Lower Secondary" },
    { step: 5, ages: "14–16", description: "Upper Secondary" }
  ]
};

// Make available globally
if (typeof window !== 'undefined') {
  window.CurriculumData = CurriculumData;
}
