import * as fs from "fs"
import program from "commander"
import * as path from "path"
import chalk from "chalk"
import * as ejs from "ejs"

let iconCmdValue = ``

program
  .version(`0.0.1`)
  .arguments(`<iconName>`)
  .action(iconName => (iconCmdValue = iconName))
  .parse(process.argv)

scaffold(iconCmdValue)

function scaffold(iconName) {
  if (!iconName) {
    console.error(
      `${chalk.red(`Error:`)} No icon name specified, use ${chalk.cyan(
        `yarn scaffold:icon CheckCircle`
      )}`
    )
    return
  }

  const basePath = path.join(process.cwd(), `./src`)

  scaffoldIconComponent(iconName, basePath, {})
}

function scaffoldIconComponent(iconName, basePath, context) {
  const componentDirPath = path.join(basePath, `components/icons`)
  const componentName = getIconComponentName(iconName)
  const fileName = `${componentName}.tsx`

  console.log(chalk.blue(`Scaffolding ${chalk.bold(componentName)} component`))
  console.log(`  generating`, chalk.bold(`${componentDirPath}/${fileName}`))

  const content = hydrateTemplate({
    COMPONENT_NAME: componentName,
    ICON_NAME: componentName,
    BODY_TEXT: `{/* insert inner SVG code here */}`,
    ...context,
  })

  try {
    const fullPath = path.join(componentDirPath, fileName)
    fs.writeFileSync(fullPath, content)
  } catch (e) {
    console.error(e)
  }

  const iconsFilePath = `${componentDirPath}/icons.ts`

  console.log(`  appending export statement to`, chalk.bold(iconsFilePath))
  fs.appendFileSync(
    iconsFilePath,
    `export { default as ${componentName} } from "./${componentName}"\n`
  )
}

function getIconComponentName(iconName) {
  return iconName
    .replace(/icon/i, ``)
    .split(`-`)
    .concat([`icon`])
    .map(str => str.substr(0, 1).toUpperCase() + str.substr(1))
    .join(``)
}

function hydrateTemplate(context) {
  const templateSource = fs.readFileSync(
    path.join(__dirname, `./icon-template.ejs`),
    {
      encoding: `utf8`,
    }
  )

  const template = ejs.compile(templateSource)
  return template(context)
}
