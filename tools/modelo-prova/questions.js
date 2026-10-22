/* Modelo — um exemplo de cada tipo. Índices começam em 0. */
SIM.registerQuestions("MODELO", [
{ id: "M01", src: 1, domain: 1, topic: "Escolha única", type: "single",
  stem: "Which tool should you use?", options: ["Tool A", "Tool B", "Tool C", "Tool D"], answer: 2,
  explanation: "Explique aqui por que **Tool C** é a correta." },

{ id: "M02", src: 2, domain: 1, topic: "Múltipla escolha", type: "multi",
  stem: "Which two actions should you perform?\n\nNOTE: Each correct selection is worth one point.",
  options: ["Action 1", "Action 2", "Action 3", "Action 4"], answer: [0, 3], explanation: "…" },

{ id: "M03", src: 3, domain: 1, topic: "Clicar em menu (hot area)", type: "multi", layout: "panel",
  stem: "Which two settings should you configure?", panelTitle: "Settings",
  options: ["General", "Password", "Personalization", "Privacy"], answer: [1, 2], shuffle: false, explanation: "…" },

{ id: "M04", src: 4, domain: 2, topic: "Sim/Não", type: "yesno",
  stem: "For each of the following statements, select Yes if the statement is true. Otherwise, select No.",
  statements: ["Statement 1", "Statement 2", "Statement 3"], answer: [true, false, true], explanation: "…" },

{ id: "M05", src: 5, domain: 2, topic: "Dropdowns", type: "hotarea",
  stem: "Use the drop-down menus to complete each statement.",
  slots: [
    { label: "Updates will be installed [answer choice] after release.", options: ["1 day", "30 days", "60 days"], answer: 1 },
    { label: "Object to create:", options: ["Profile", "Policy", "Ring"], answer: 2 }
  ], explanation: "…" },

{ id: "M06", src: 6, domain: 2, topic: "Ordenação", type: "order",
  stem: "Which three actions should you perform in sequence?",
  pool: ["Step B", "Step A", "Distractor", "Step C"], answer: [1, 0, 3], explanation: "…" },

{ id: "M07", src: 7, domain: 2, topic: "Arrastar para destinos", type: "match",
  stem: "Drag the appropriate features to the correct requirements. Each feature may be used once, more than once, or not at all.",
  pool: ["Feature 1", "Feature 2", "Feature 3"],
  targets: [ { label: "Requirement X:", answer: 2 }, { label: "Requirement Y:", answer: 0 } ], explanation: "…" },

{ id: "M08", src: 8, domain: 1, topic: "Estudo de caso", type: "single", group: { kind: "case", id: "CONTOSO" },
  stem: "Which server is the domain controller?", options: ["Server1", "Server2"], answer: 0, shuffle: false, explanation: "…" },

{ id: "M09", src: 9, domain: 1, topic: "Série", type: "single", group: { kind: "series", id: "S1" },
  stem: "You need to do X.\n\n**Solution:** You do Y.\n\nDoes this meet the goal?", options: ["Yes", "No"], answer: 1, shuffle: false, explanation: "…" },
{ id: "M10", src: 10, domain: 1, topic: "Série", type: "single", group: { kind: "series", id: "S1" },
  stem: "You need to do X.\n\n**Solution:** You do Z.\n\nDoes this meet the goal?", options: ["Yes", "No"], answer: 0, shuffle: false, explanation: "…" },

{ id: "M11", src: 11, domain: 2, topic: "Com exhibit", type: "single",
  stem: "You have the configuration shown in the following exhibit.\n\nWhat happens next?",
  exhibits: [{ src: "img/M11-1.png", alt: "Coloque o print em img/ com este nome" }],
  options: ["Option A", "Option B"], answer: 0, scope: "borderline", review: "duvidosa", explanation: "…" }
]);
