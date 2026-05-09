import fs from 'node:fs/promises';
import path from 'node:path';

async function getJsonFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        return getJsonFiles(fullPath);
      }

      if (entry.isFile() && entry.name.endsWith('.json')) {
        return [fullPath];
      }

      return [];
    }),
  );

  return files.flat();
}

async function main() {
  const dataDir = path.join(process.cwd(), 'data');
  const jsonFiles = await getJsonFiles(dataDir);

  let hasErrors = false;

  for (const filePath of jsonFiles) {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      JSON.parse(content);
      console.log(`✅ ${filePath}`);
    } catch (error) {
      hasErrors = true;
      console.error(`❌ ${filePath}`);
      console.error((error as Error).message);
    }
  }

  if (hasErrors) {
    process.exit(1);
  }
}

main();