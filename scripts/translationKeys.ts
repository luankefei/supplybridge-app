import * as fs from "fs";
import * as path from "path";

function readTranslationFile(filePath: string): Record<string, string> {
  const fileContent = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContent);
}

function compareTranslationKeys(
  keys1: string[],
  keys2: string[]
): { missingKeys1: string[]; missingKeys2: string[] } {
  const missingKeys1 = keys2.filter((key) => !keys1.includes(key));
  const missingKeys2 = keys1.filter((key) => !keys2.includes(key));

  return {
    missingKeys1,
    missingKeys2,
  };
}

function compareFile(filename: string): void {
  const enFilePath = path.join(
    __dirname,
    `../public/locales/en/${filename}.json`
  );
  const deFilePath = path.join(
    __dirname,
    `../public/locales/de/${filename}.json`
  );

  const enKeys = Object.keys(readTranslationFile(enFilePath));
  const deKeys = Object.keys(readTranslationFile(deFilePath));

  const { missingKeys1, missingKeys2 } = compareTranslationKeys(enKeys, deKeys);

  if (missingKeys1.length > 0) {
    console.error(
      `Missing keys in 'en' that are present in 'de': ${missingKeys1.join(
        ", "
      )}`
    );
    process.exit(1);
  }

  if (missingKeys2.length > 0) {
    console.error(
      `Missing keys in 'de' that are present in 'en': ${missingKeys2.join(
        ", "
      )}`
    );
    process.exit(1);
  }
}

function main(): void {
  compareFile("translation");
  compareFile("rawMaterial");
  console.log("All good!");
}

main();
