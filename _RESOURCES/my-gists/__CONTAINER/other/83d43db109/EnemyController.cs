using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class EnemyController : MonoBehaviour
{
    public float speed;
    public float pushRadius;

    private Rigidbody m_Rb;
    private GameObject m_FollowTarget;
    private bool m_IsRecharged;

    private void Awake()
    {
        AddCircle();
        m_Rb = GetComponent<Rigidbody>();
        m_IsRecharged = true;
    }

    // Start is called before the first frame update
    void Start()
    {
        m_FollowTarget = GameObject.Find("Player");
    }

    // Update is called once per frame
    void FixedUpdate()
    {
        Vector3 moveTowards = m_FollowTarget.transform.position - transform.position;
        moveTowards.y = 0;
        m_Rb.AddForce(moveTowards.normalized * speed);

        if (Mathf.Abs(moveTowards.magnitude) <= pushRadius && m_IsRecharged)
        {
            m_IsRecharged = false;
            m_Rb.AddForce(moveTowards.normalized * speed * 1.3f, ForceMode.Impulse);
            Invoke(nameof(Recharge), 2.0f);
        }

        if (transform.position.y <= -15.0f)
        {
            Destroy(gameObject);
        }
    }

    void Recharge()
    {
        m_IsRecharged = true;
    }

    void AddCircle()
    {
        GameObject go = new GameObject
        {
            name = "Circle"
        };
        Vector3 circlePosition = Vector3.zero;
        circlePosition.y = -0.49f;

        go.transform.parent = transform;
        go.transform.localPosition = circlePosition;

        go.DrawCircle(pushRadius, .02f);
    }
}
