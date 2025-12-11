const vscode = require('vscode');
const path = require('path');

/**
 * Calcula el namespace estilo Laravel a partir de la ruta del archivo.
 * Ejemplo: .../app/Http/Controllers/Admin/UserController.php
 * => App\Http\Controllers\Admin
 */
function getLaravelNamespace(filePath) {
    const parts = filePath.split(path.sep);

    // Buscar carpeta "app"
    const appIndex = parts.lastIndexOf('app');
    if (appIndex === -1) {
        // Si no está dentro de app/, devolvemos App por defecto
        return 'App';
    }

    // Partes después de "app", sin incluir el nombre del archivo
    const nsParts = parts.slice(appIndex + 1, parts.length - 1);

    if (nsParts.length === 0) {
        return 'App';
    }

    // Unir con backslash estilo PHP
    return 'App\\' + nsParts.join('\\');
}

function activate(context) {
    const disposable = vscode.commands.registerCommand(
        'laravelPhpClassGenerator.createPhpClass',
        () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                vscode.window.showInformationMessage('No hay ningún editor activo.');
                return;
            }

            const doc = editor.document;

            // Solo tiene sentido en archivos .php
            if (doc.languageId !== 'php') {
                vscode.window.showWarningMessage('Este comando está pensado para archivos PHP.');
            }

            const filePath = doc.fileName;
            const className = path.basename(filePath, '.php');
            const namespace = getLaravelNamespace(filePath);

            // Si el archivo ya tiene contenido, avisamos
            if (doc.getText().trim().length > 0) {
                vscode.window.showWarningMessage(
                    'El archivo ya tiene contenido. Se insertará la clase al principio.'
                );
            }

            const template = `<?php

namespace ${namespace};

class ${className}
{
    public function __construct()
    {
        //
    }
}
`;

            editor.edit(editBuilder => {
                const startPos = new vscode.Position(0, 0);
                editBuilder.insert(startPos, template);
            });
        }
    );

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
