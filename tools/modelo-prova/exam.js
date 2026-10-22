/* Modelo de prova — copie esta pasta para exams/<CODIGO>/ e ajuste.
   Depois acrescente { code: "<CODIGO>", folder: "exams/<CODIGO>" } no exams.js da raiz. */
SIM.registerExam({
  code: "MODELO",
  title: "Prova de exemplo",
  language: "en",
  passingScore: 700,
  defaultQuestions: 10,
  defaultMinutes: 20,
  sourceNote: "Modelo com um exemplo de cada tipo de questão",
  domains: [
    { id: 1, name: "Domínio A", min: 40, max: 50 },
    { id: 2, name: "Domínio B", min: 50, max: 60 }
  ],
  cases: {
    CONTOSO: {
      title: "Contoso, Ltd.",
      tabs: [
        { title: "Overview", body: "Contoso has a main office in Lisbon.\n\n| Name | Role |\n|---|---|\n| Server1 | Domain controller |" },
        { title: "Requirements", body: "- Minimize administrative effort.\n- Use least privilege." }
      ]
    }
  }
});
