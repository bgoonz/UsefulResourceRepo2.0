function onElementInserted(containerSelector, elementSelector, callback) {
  const onMutationsObserved = function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.addedNodes.length) {
        const elementAdded = [].some.call(mutation.addedNodes, function (el) {
          return el.id && el.id === elementSelector;
        });
        if (elementAdded) {
          callback();
        }
      }
    });
  };

  const target = $(containerSelector)[0];
  const config = {
    childList: true,
    subtree: true,
  };
  const MutationObserver =
    window.MutationObserver || window.WebKitMutationObserver;
  const observer = new MutationObserver(onMutationsObserved);
  observer.observe(target, config);
}
