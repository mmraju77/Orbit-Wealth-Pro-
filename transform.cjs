module.exports = function(fileInfo, api) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);
  
  let modified = false;

  root.find(j.VariableDeclarator, {
    id: { name: 'results' },
    init: { callee: { name: 'useMemo' } }
  }).forEach(path => {
    const useMemoCall = path.node.init;
    const arrowFunc = useMemoCall.arguments[0];
    const deps = useMemoCall.arguments[1];
    
    const useStateDecl = j.variableDeclaration('const', [
      j.variableDeclarator(
        j.arrayPattern([j.identifier('results'), j.identifier('setResults')]),
        j.callExpression(j.identifier('useState'), [j.nullLiteral()])
      )
    ]);
    
    const body = arrowFunc.body;
    j(body).find(j.ReturnStatement).forEach(retPath => {
      j(retPath).replaceWith(
        j.expressionStatement(
          j.callExpression(j.identifier('setResults'), [retPath.node.argument])
        )
      );
    });

    const setTimeoutCall = j.callExpression(j.identifier('setTimeout'), [
      j.arrowFunctionExpression([], body),
      j.numericLiteral(0)
    ]);

    const timerDecl = j.variableDeclaration('const', [
      j.variableDeclarator(j.identifier('timer'), setTimeoutCall)
    ]);

    const clearTimeoutCall = j.returnStatement(
      j.arrowFunctionExpression([], 
        j.callExpression(j.identifier('clearTimeout'), [j.identifier('timer')])
      )
    );

    const useEffectBody = j.blockStatement([timerDecl, clearTimeoutCall]);
    
    const useEffectCall = j.expressionStatement(
      j.callExpression(j.identifier('useEffect'), [
        j.arrowFunctionExpression([], useEffectBody),
        deps
      ])
    );

    j(path.parent).replaceWith([useStateDecl, useEffectCall]);
    modified = true;
  });

  // Now find the final return statement of the component and insert `if (!results) return ...`
  if (modified) {
    const componentFunction = root.find(j.FunctionDeclaration).filter(p => {
       return p.node.id && p.node.id.name.endsWith('Calculator') || p.node.id.name === 'DebtSnowball';
    });
    if (componentFunction.length > 0) {
       const body = componentFunction.get(0).node.body;
       const returnStatements = j(body).find(j.ReturnStatement);
       if (returnStatements.length > 0) {
         // Insert before the last return statement
         const lastReturn = returnStatements.at(returnStatements.length - 1);
         const fallback = j.ifStatement(
           j.unaryExpression('!', j.identifier('results')),
           j.returnStatement(
             j.jsxElement(
               j.jsxOpeningElement(j.jsxIdentifier('div'), [
                 j.jsxAttribute(j.jsxIdentifier('className'), j.stringLiteral('animate-pulse h-96 bg-white/5 rounded-3xl w-full max-w-7xl mx-auto mt-8'))
               ], true),
               null,
               []
             )
           )
         );
         lastReturn.insertBefore(fallback);
       }
    }
  }

  return modified ? root.toSource() : null;
};
