
using System.Collections.Generic;
using UnityEngine;

[System.Serializable]
[UnityEngine.CreateAssetMenu(menuName = "YT Games/Inventory")]
public class Inventory : ScriptableObject
{
    public List<string> items;

    public void AwakeInventory()
    {
        items = new List<string>();
    }

    public void AddItem(string itemName)
    {
        items.Add(itemName);
    }

    public void RemoveItem(int index)
    {
        items.RemoveAt(index);
    }
}
