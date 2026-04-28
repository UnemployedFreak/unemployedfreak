const raw = await fetch(
  "https://raw.githubusercontent.com/UnemployedFreak/jobcenter-life/main/README.md"
).then((r) => r.text());

const lines = raw.split("\n").slice(1);
const footer = lines.findLast((l) => l.trim() !== "");
const body = lines.filter((l) => l !== footer).join("\n").trim();

const content = `<div align="center">

<img src="https://raw.githubusercontent.com/UnemployedFreak/unemployedfreak/main/assets/osaka.gif" width="720px" alt="Osaker" />

<br>${body}

<img src="https://raw.githubusercontent.com/UnemployedFreak/unemployedfreak/main/assets/azu-dance.gif" width="300px" alt="Bonkurazu" />

${footer}

</div>
`;

Deno.writeTextFile("README.md", content);

async function runCommit() {
  console.log("Commiting updated README.md...");
  await new Deno.Command("git", {
    args: ["add", "README.md"],
  }).output();

  const result = await new Deno.Command("git", {
    args: ["commit", "-m", "Update README.md"],
  }).output();

  if (!result.success) throw new Error(new TextDecoder().decode(result.stderr));
  const out = new TextDecoder().decode(result.stdout);
  console.log(out.trim());
}

await runCommit();
