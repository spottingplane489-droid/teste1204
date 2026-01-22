const API = "teste1204-production.up.railway.app/merge";

async function merge() {
  const input = document.getElementById("files");
  const status = document.getElementById("status");

  if (input.files.length < 2) {
    status.innerText = "manda pelo menos 2 PDFs, animal";
    return;
  }

  const formData = new FormData();
  for (const file of input.files) {
    formData.append("files", file);
  }

  status.innerText = "juntando PDFs...";

  try {
    const res = await fetch(API, {
      method: "POST",
      body: formData
    });

    if (!res.ok) throw new Error();

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "merged.pdf";
    a.click();

    status.innerText = "PDF pronto 😈";
  } catch {
    status.innerText = "deu ruim pra caralho 😭";
  }
}
