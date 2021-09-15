class DirectoryTreeNode {
  constructor(name, type, lastModifiedTime) {
    this.name = name;
    this.type = type;
    this.lastModifiedTime = lastModifiedTime;
    this.children = [];
  }

  addChild(child) {
    child.parent = this;
    this.children.push(child);
  }

  clearChildren() {
    this.children = [];
  }

  find(path) {
    if (path === "") return this;

    if (path.startsWith('/')) {
      path = path.substring(1);
    }

    let slashIndex = path.indexOf('/');
    if (slashIndex === -1) {
      slashIndex = path.length;
    }
    const targetName = path.substring(0, slashIndex);
    const remainingPath = path.substring(slashIndex);

    for (let child of this.children) {
      if (child.name === targetName) {
        return child.find(remainingPath);
      }
    }
  }

  getFullPath() {
    if (this.name === undefined) {
      return '';
    }
    let parentPath = '';
    if (this.parent !== undefined) {
      parentPath = this.parent.getFullPath();
    }
    return `${parentPath}/${this.name}`;
  }

  getIconTypeName() {
    if (this.type === 'directory') {
      return this.name;
    }

    if (this.type === 'file') {
      const dotIndex = this.name.lastIndexOf('.');
      if (dotIndex >= 0) {
        return this.name.substring(dotIndex + 1).toLowerCase();
      }
      return this.name;
    }

    return '';
  }
}

function updateVisualTree(element, directoryTreeNode) {
  const ul = document.createElement('ul');
  ul.classList.add('tree');
  if (directoryTreeNode !== dataTreeRoot) {
    ul.classList.add('tree--nested');
  }
  for (let child of directoryTreeNode.children) {
    updateVisualTreeEntry(ul, child);
  }
  element.appendChild(ul);
}
function updateVisualTreeEntry(treeElement, child) {
  const li = document.createElement('li');
    li.classList.add('tree-entry');
    li.dataset.pathName = child.getFullPath();
    li.dataset.type = child.type;
    if (child.type === 'file') {
      li.innerHTML = `
        <div class="tree-entry__disclosure tree-entry__disclosure--disabled"></div>
        <img class="tree-entry__icon" src="/icons/file_type_${child.getIconTypeName()}.svg">
        <div class="tree-entry__name">${child.name}</div>
        <div class="tree-entry__time">${child.lastModifiedTime}</div>
      `;
    } else if (child.type === 'directory') {
      li.innerHTML = `
        <div class="tree-entry__disclosure tree-entry__disclosure--closed"></div>
        <img class="tree-entry__icon" src="/icons/folder_type_${child.getIconTypeName()}.svg">
        <div class="tree-entry__name">${child.name}</div>
        <div class="tree-entry__time">${child.lastModifiedTime}</div>
      `;
    }
    treeElement.appendChild(li);
}

// Root of the data tree in memory
const dataTreeRoot = new DirectoryTreeNode();

window.addEventListener('DOMContentLoaded', async () => {
  const fileSection = document.querySelector('#file-section');
  const moveFile = document.querySelector('#move-a-file');
  let fileMoving = [];
  let isMovingFile = false;

  document.querySelector('#tree-section').addEventListener('click', async (event) => {
    const { target } = event;
    const treeEntryElement = target.parentElement;
    if (isMovingFile) {
      if (treeEntryElement.dataset.type === "file" || treeEntryElement.dataset.type === 'directory') {
        if (fileMoving.length === 0) {
          return fileMoving.push(treeEntryElement.dataset.pathName);
        }
        if (treeEntryElement.dataset.type !== "file") {
          const body = JSON.stringify({ destination: treeEntryElement.dataset.pathName });
          const url = `http://localhost:3001/api/entry${fileMoving[0]}`;
          const response = await fetch(url, {
            body,
            headers: new Headers({'Content-Type': 'application/json'}),
            method: 'PATCH',
          });
          if (response.ok) {
            window.location.reload();
          }
        }
        fileMoving = [];
        isMovingFile = false;
        moveFile.disabled = false;
      }
    } else if (target.classList.contains('tree-entry__disclosure--closed')) {
      target.classList.remove('tree-entry__disclosure--closed');
      target.classList.add('tree-entry__disclosure--opened');
      const directoryName = treeEntryElement.dataset.pathName;
      const response = await fetch(`/api/path${directoryName}`);
      if (response.ok) {
        const entries = await response.json();
        const parent = dataTreeRoot.find(directoryName);
        target.nextElementSibling.src = `/icons/folder_type_${parent.getIconTypeName()}_opened.svg`;
        for (let entry of entries) {
          const { name, type, lastModifiedTime } = entry;
          const node = new DirectoryTreeNode(name, type, lastModifiedTime);
          parent.addChild(node);
        }
        updateVisualTree(treeEntryElement, parent);
      }
    } else if (target.classList.contains('tree-entry__disclosure--opened')) {
      target.classList.add('tree-entry__disclosure--closed');
      target.classList.remove('tree-entry__disclosure--opened');
      const directoryName = treeEntryElement.dataset.pathName;
      const parent = dataTreeRoot.find(directoryName);
      target.nextElementSibling.src = `/icons/folder_type_${parent.getIconTypeName()}.svg`;
      parent.clearChildren();
      treeEntryElement.querySelector('.tree').remove();
    } else if (target.classList.contains('tree-entry__name')) {
      const fileName = treeEntryElement.dataset.pathName;
      const node = dataTreeRoot.find(fileName);
      const fileType = node.getIconTypeName().toLowerCase();
      if (['gif', 'jpg', 'png', 'svg'].includes(fileType)) {
        const response = await fetch(`http://localhost:3001/api/file${fileName}`);
        if (response.ok) {
          const imageData = await response.blob();
          const url = URL.createObjectURL(imageData);
          fileSection.innerHTML = `
            <img src="${url}">
          `;
        }
        fileSection.classList.add('file-section--show');
      } else if (['css', 'html', 'js', 'md', 'rb', 'text', 'txt'].includes(fileType)) {
        const response = await fetch(`http://localhost:3001/api/file${fileName}`);
        if (response.ok) {
          const text = await response.text();
          fileSection.innerHTML = `
            <pre class="file-section__text">${text}</pre>
          `;
        }
        fileSection.classList.add('file-section--show');
      }
    }
  });

  moveFile.addEventListener('click', () => {
    isMovingFile = true;
    moveFile.disabled = true;
  });

  fileSection.addEventListener('click', () => {
    fileSection.classList.remove('file-section--show');
  });

  const overlay = document.getElementById('loading-overlay');
  try {
    const response = await fetch('/api/path');
    if (response.ok) {
      const entries = await response.json();
      for (let entry of entries) {
        const { name, type, lastModifiedTime } = entry;
        const node = new DirectoryTreeNode(name, type, lastModifiedTime);
        dataTreeRoot.addChild(node);
      }
      overlay.classList.add('overlay--hidden');
    }

    const uiTreeRoot = document.querySelector('#tree-section');
    updateVisualTree(uiTreeRoot, dataTreeRoot);
  } catch (e) {
    console.error(e);
    overlay.classList.add('overlay--error');
  }

});
