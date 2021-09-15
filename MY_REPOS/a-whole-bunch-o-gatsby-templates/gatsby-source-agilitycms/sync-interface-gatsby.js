const getNodeID = ({ options, itemType, languageCode, itemID }) => {
	const preStr = `agility${languageCode}-${itemType}-${itemID}`.toLowerCase();
	return options.createNodeId(preStr);
}

const saveItem = async ({ options, item, itemType, languageCode, itemID }) => {
	const nodeID = getNodeID({ options, itemType, languageCode, itemID });
	let typeName = `agility${itemType}`;

	let nodeObj = {
		languageCode: languageCode,
		itemID: itemID
	}

	//rename 'fields' to 'customFields', because 'fields' is a reserved name
	if (item.fields) {
		item.customFields = item.fields;
		delete item.fields;
	}

	switch (itemType) {
		case "item": {
			nodeObj.itemJson = "";
			break;
		}
		case "page": {
			nodeObj.pageJson = "";
			break;
		}
		case "state": {
			break;
		}
		case "sitemap": {
			break;
		}
		case "urlredirections":{
			break;
		}
		case "nestedsitemap": {
			//we can't store an array...
			item = { nodes: item };
			break;
		}
		default: {
			//a content 'list'...
			item.languageCode = languageCode;
			item.itemID = itemID;
			nodeObj = item;
		}

	}

	const jsonContent = JSON.stringify(item);
	const nodeMeta = {
		id: nodeID,
		parent: null,
		children: [],
		internal: {
			type: typeName,
			content: jsonContent,
			contentDigest: options.createContentDigest(item)
		}
	}

	const nodeToCreate = Object.assign({}, nodeObj, nodeMeta);

	await options.createNode(nodeToCreate);
}



const deleteItem = async ({ options, itemType, languageCode, itemID }) => {
	const nodeID = getNodeID({ options, itemType, languageCode, itemID });
	const node = options.getNode(nodeID);

	if (node) {
		options.deleteNode(node);
	}
}

const mergeItemToList = async ({ options, item, languageCode, itemID, referenceName, definitionName }) => {
	//save the item in a list based on the content definition name...
	if (item.properties.state === 3) {
		//handle deletes

		await deleteItem({ options, itemType: definitionName, languageCode, itemID });

	} else {
		//save the item in the list
		await saveItem({ options, item: item, itemType: definitionName, languageCode, itemID });
	}
}

const getItem = async ({ options, itemType, languageCode, itemID }) => {
	const nodeID = getNodeID({ options, itemType, languageCode, itemID });
	const node = await options.getNode(nodeID);
	if (node == null) return null;

	const json = node.internal.content;
	const item = JSON.parse(json);

	return item;
}

const clearItems = async ({ options }) => {
	//don't need to handle this - gatsby clear will do that for us...
}



module.exports = {
	saveItem,
	deleteItem,
	mergeItemToList,
	getItem,
	clearItems
}
