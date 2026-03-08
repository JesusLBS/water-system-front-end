const fs = require('fs');
const path = require('path');

// Function to capitalize the first letter of a string
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Function to recursively delete a directory and its contents
function deleteFolderRecursive(directoryPath) {
  if (fs.existsSync(directoryPath)) {
    fs.readdirSync(directoryPath).forEach((file) => {
      const currentPath = path.join(directoryPath, file);
      if (fs.lstatSync(currentPath).isDirectory()) {
        // Recursively delete subdirectories
        deleteFolderRecursive(currentPath);
      } else {
        // Delete file
        fs.unlinkSync(currentPath);
      }
    });
    fs.rmdirSync(directoryPath);
    console.log(`Directory '${directoryPath}' deleted.`);
  } else {
    console.error(`Directory '${directoryPath}' does not exist.`);
  }
}

// Determine if the action is to create or delete
const action = process.argv[2];
const moduleName = process.argv[3];
const folderPath = process.argv[4] || ''; // Ruta adicional opcional

if (!moduleName) {
  console.error("Please provide the module name. Example: 'yarn manage:module auth'");
  process.exit(1);
}

// Base path for the modules, allowing for a custom folder path
const basePath = path.join(__dirname, '../src/modules', folderPath, moduleName);

// Module structure for creation
const folders = ['components', 'pages', 'services', 'routes'];
const files = {
  components: [], // Leave this folder empty
  pages: [], // Leave this folder empty
  services: [`${moduleName}Service.ts`],
  routes: [`${capitalize(moduleName)}Routes.tsx`]
};

if (action === 'create') {
  // Create the main module folder
  if (!fs.existsSync(basePath)) {
    fs.mkdirSync(basePath, { recursive: true });
    console.log(`Main folder '${moduleName}' created at: ${basePath}`);
  } else {
    console.log(`Module '${moduleName}' already exists.`);
    process.exit(1);
  }

  // Create subfolders and files
  folders.forEach(folder => {
    const folderPath = path.join(basePath, folder);

    // Create the folder
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
      console.log(`Folder '${folder}' created at: ${folderPath}`);
    }

    // Create files in the corresponding folder if applicable
    files[folder].forEach(file => {
      const filePath = path.join(folderPath, file);
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, `// ${file} - ${folder}`);
        console.log(`File '${file}' created at: ${filePath}`);
      }
    });
  });

  console.log(`Module '${moduleName}' created successfully.`);
} else if (action === 'rollback') {
  // Delete the entire module
  deleteFolderRecursive(basePath);
} else {
  console.error("Unrecognized action. Use 'create' or 'rollback'.");
}
