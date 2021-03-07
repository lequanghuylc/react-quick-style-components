const fs = require('fs');
const path = require('path');
const esformatter = require('esformatter');
esformatter.register(require('esformatter-jsx'));

const SCREEN_FOLDER = path.join(__dirname, './src/screens');

const makeCodeJson = () => {
  const listOfScreen = fs.readdirSync(SCREEN_FOLDER).filter(val => val.includes('.tsx'));
  listOfScreen.forEach(screenFilename => {
    const screenCodeString = fs.readFileSync(path.join(SCREEN_FOLDER, './'+screenFilename)).toString();
    const startIndex = screenCodeString.indexOf('withUIAndCodeTab(navigation, code,') + 'withUIAndCodeTab(navigation, code,'.length;
    const endIndex = screenCodeString.indexOf('return <Content />');
    const jsxString = screenCodeString.substring(startIndex,endIndex ).replace(');', '').replace(')', '').trim();
    const code = jsxString;
    // const code = esformatter.format(jsxString);
    const savedPath = path.join(SCREEN_FOLDER, './'+screenFilename.replace('.tsx', '.jsx.json'));
    const json = { code };
    fs.writeFileSync(savedPath, JSON.stringify(json, undefined, 2));
  });
}

makeCodeJson();