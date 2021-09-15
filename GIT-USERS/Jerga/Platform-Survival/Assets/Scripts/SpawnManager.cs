using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SpawnManager : MonoBehaviour
{
    public GameObject enemyPrefab;
    public GameObject powerupPrefab;
    public Vector2 spawnRange;

    private int m_EnemyCount;
    private int m_waves;

    private void Awake()
    {
        m_waves = 1;
        enabled = false;
    }

    private void Update()
    {
        m_EnemyCount = FindObjectsOfType<EnemyController>().Length;

        if (m_EnemyCount == 0)
        {
            m_waves++;
            SpawnEnemy();
            SpawnPowerup();
        }
    }

    public void StartSpawning()
    {
        enabled = true;
        SpawnEnemy();
        SpawnPowerup();
    }

    private void SpawnPowerup()
    {
        SpawnEntity(powerupPrefab);
    }

    private void SpawnEnemy()
    {
        for (var i = 0; i < m_waves; i++)
        {
            SpawnEntity(enemyPrefab);
        }
    }

    private void SpawnEntity(GameObject entity)
    {
        Vector3 spawnPosition = new Vector3(
            Random.Range(spawnRange[0], spawnRange[1]),
            enemyPrefab.transform.position.y,
            Random.Range(spawnRange[0], spawnRange[1]));

        Instantiate(entity, spawnPosition, entity.transform.rotation);
    }
}
