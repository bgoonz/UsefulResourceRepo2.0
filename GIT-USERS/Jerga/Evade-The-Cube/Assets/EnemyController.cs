using System.Collections;
using System.Collections.Generic;
using UnityEngine;


public enum EnemyType
{
    Catcher,
    Evader
}

public class EnemyController : MonoBehaviour
{
    public float speed;
    public EnemyType enemyType;

    private float m_TresholdPositionZ = -20.0f;
    private PlayerController m_Pc;

    private void Start()
    {
        m_Pc = GameObject
            .Find("Player")
            .GetComponent<PlayerController>();
    }

    private void Update()
    {
        transform.position = new Vector3(
            transform.position.x,
            transform.position.y,
            transform.position.z - speed * Time.deltaTime);

        // measure distance between the enemy and player position

        if (Vector3.Distance(m_Pc.transform.position, transform.position) < 1.0f) {
            if (enemyType == EnemyType.Evader)
            {
                m_Pc.ReceiveDamage();
            }

            Destroy(gameObject);

        } else if (m_Pc.transform.position.z - transform.position.z > 5.0f && enemyType == EnemyType.Catcher)
        {
            m_Pc.ReceiveDamage();
            Destroy(gameObject);
        }

        else if (transform.position.z <= m_TresholdPositionZ)
        {
            Destroy(gameObject);
        }
    }
}
