module.exports = function(fileInfo, api) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);
  const path = require('path');
  const filename = path.basename(fileInfo.path, '.tsx');

  // Do not process non-calculators
  if (!filename.includes('Calculator') && !['DebtSnowball', 'ChildEducationPlanner', 'LoanEligibility', 'BalanceTransfer', 'CreditCardPayoff', 'CurrencyConverter'].includes(filename)) {
    return null;
  }
  if (filename === 'CalculatorSEO') return null;

  let hasImport = false;
  root.find(j.ImportDeclaration, { source: { value: './CalculatorSEO' } }).forEach(() => { hasImport = true; });
  if (!hasImport) {
    // Add import
    const importDecl = j.importDeclaration(
      [j.importSpecifier(j.identifier('CalculatorSEO'), j.identifier('CalculatorSEO'))],
      j.literal('./CalculatorSEO')
    );
    root.find(j.ImportDeclaration).at(0).insertBefore(importDecl);
  }

  // Find the return statement of the component
  let modified = false;
  const componentFunction = root.find(j.FunctionDeclaration).filter(p => {
    return p.node.id && p.node.id.name === filename;
  });

  if (componentFunction.length > 0) {
    const fn = componentFunction.get(0);
    // Find the last return statement
    const returnStatements = j(fn.node.body).find(j.ReturnStatement).nodes();
    if (returnStatements.length > 0) {
      const retNode = returnStatements[returnStatements.length - 1];
      const argument = retNode.argument;
      
      if (argument && (argument.type === 'JSXElement' || argument.type === 'JSXFragment')) {
        const title = filename.replace(/([A-Z])/g, ' $1').trim().replace('Calculator', '');
        const seoNode = j.jsxElement(
          j.jsxOpeningElement(j.jsxIdentifier('CalculatorSEO'), [
            j.jsxAttribute(j.jsxIdentifier('id'), j.stringLiteral(filename)),
            j.jsxAttribute(j.jsxIdentifier('title'), j.stringLiteral(`${title} Calculator`)),
            j.jsxAttribute(j.jsxIdentifier('description'), j.stringLiteral(`Calculate your ${title.toLowerCase()} easily and accurately with Orbit Wealth Pro.`)),
            j.jsxAttribute(j.jsxIdentifier('faqs'), j.jsxExpressionContainer(
              j.arrayExpression([
                j.objectExpression([
                  j.property('init', j.identifier('question'), j.stringLiteral(`What is the ${title} Calculator?`)),
                  j.property('init', j.identifier('answer'), j.stringLiteral(`The ${title} Calculator is a financial tool designed to help you calculate and estimate your figures accurately.`))
                ]),
                j.objectExpression([
                  j.property('init', j.identifier('question'), j.stringLiteral(`How do I use this calculator?`)),
                  j.property('init', j.identifier('answer'), j.stringLiteral(`Simply enter your inputs into the designated fields, and the calculator will automatically process and display the estimated results.`))
                ]),
                j.objectExpression([
                  j.property('init', j.identifier('question'), j.stringLiteral(`Are the results accurate?`)),
                  j.property('init', j.identifier('answer'), j.stringLiteral(`The results are highly accurate estimates based on standard financial formulas, but should be used for informational purposes only.`))
                ])
              ])
            ))
          ], true)
        );
        
        let exists = false;
        j(argument).find(j.JSXElement).forEach(p => {
          if (p.node.openingElement.name.name === 'CalculatorSEO') exists = true;
        });

        if (!exists) {
          if (argument.type === 'JSXElement') {
            argument.children.push(j.jsxText('\n        '));
            argument.children.push(seoNode);
            argument.children.push(j.jsxText('\n      '));
            modified = true;
          } else if (argument.type === 'JSXFragment') {
            argument.children.push(j.jsxText('\n        '));
            argument.children.push(seoNode);
            argument.children.push(j.jsxText('\n      '));
            modified = true;
          }
        }
      }
    }
  }

  return modified ? root.toSource() : null;
};
