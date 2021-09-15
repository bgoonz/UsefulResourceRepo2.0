
using UnityEngine;
using UnityEngine.Events;

public class Pickup : MonoBehaviour
{
    public GameObject itemPrefab;
    public UnityEvent<string> OnItemAddedEvent;

    // Update is called once per frame
    void Update()
    {
        transform.Rotate(Vector3.one * Time.deltaTime * 20);
    }

    private void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Player"))
        {
            OnItemAddedEvent.Invoke(itemPrefab.name);
            Destroy(gameObject);
        }
    }
}
