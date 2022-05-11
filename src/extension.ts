import * as vscode from "vscode";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";
export async function activate(context: vscode.ExtensionContext) {
  const res = await axios.get(
    "http://restapi.adequateshop.com/api/Traveler?page=6"
  );
  const parser = new XMLParser();
  const jObjs = parser.parse(res.data).TravelerinformationResponse.travelers
    .Travelerinformation;

  let disposable = vscode.commands.registerCommand(
    "cad-gui-demo.CADTest",
    async () => {
      const jObj = await vscode.window.showQuickPick(
        jObjs.map((item: any) => {
          return {
            label: item.name,
            description: item.createdat,
            link: `https://fakeimg.pl/200x100/?retina=1&text=${item.name}&font=noto`,
          };
        }),
        {
          matchOnDetail: true,
        }
      );
      if (jObj === null) {
        return;
      }
      vscode.env.openExternal(
        vscode.Uri.parse(`https://fakeimg.pl/200x100/?retina=1&text=&font=noto`)
      );
    }
  );

  context.subscriptions.push(disposable);
  const a = vscode.commands.registerCommand(
    "cad-gui-demo.CADQuestion",
    async () => {
		// const TYPESCRIPT = ego_tools_typescript.toTypeScript(
		// 	val
		// );
		const NEW_TEXT_DOCUMENT = await vscode.workspace.openTextDocument({
			content: `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta http-equiv="X-UA-Compatible" content="IE=edge">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Document</title>
			</head>
			<body>
				
			</body>
			</html>
			`,
			language: 'html',
		});

		await vscode.window.showTextDocument(
			NEW_TEXT_DOCUMENT,
			vscode.ViewColumn.Two,
		);
    }
  );
  context.subscriptions.push(a);
}

// this method is called when your extension is deactivated
export function deactivate() {}
