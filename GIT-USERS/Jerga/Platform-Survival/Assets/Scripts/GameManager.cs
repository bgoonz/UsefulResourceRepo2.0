using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.SceneManagement;

public class GameManager : MonoBehaviour
{
    public GameObject startScreen;
    public UnityEvent OnGameStart;

    private SpawnManager m_SpawnManager;

    // Start is called before the first frame update
    void Start()
    {
        m_SpawnManager = FindObjectOfType<SpawnManager>();
        var elevators = FindObjectsOfType<Elevator>();

        for (int i = 0; i < elevators.Length; i++)
        {
            OnGameStart.AddListener(elevators[i].OnGameStart);
        }
    }

    public void RestartGame()
    {
        SceneManager.LoadScene(SceneManager.GetActiveScene().name);
    }

    public void StartGame()
    {
        OnGameStart.Invoke();
        m_SpawnManager.StartSpawning();
        startScreen.SetActive(false);
    }
}
