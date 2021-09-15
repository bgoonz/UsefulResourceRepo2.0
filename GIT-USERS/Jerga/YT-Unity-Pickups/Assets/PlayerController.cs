using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    public float speed = 8.0f;

    private Rigidbody m_Rb;
    private Camera m_Camera;
    private Vector3 m_Movement;
    private Vector3 m_TargetDirection;
    private Quaternion m_TargetRotation;

    // Start is called before the first frame update
    void Awake()
    {
        m_Rb = GetComponent<Rigidbody>();
        m_Camera = Camera.main;
    }

    void FixedUpdate()
    {
        float horizontalInput = Input.GetAxis("Horizontal");
        float verticalInput = Input.GetAxis("Vertical");

        m_Movement.Set(horizontalInput, 0, verticalInput);

        if (m_Movement == Vector3.zero)
        {
            return;
        }

        ComputeRotation();
        ComputeDirection();

        m_Rb.MovePosition(m_Rb.position + m_TargetDirection * speed * Time.fixedDeltaTime);
        m_Rb.MoveRotation(m_TargetRotation);
    }

    void ComputeDirection()
    {
        m_TargetDirection = (m_TargetRotation * Vector3.forward).normalized;
        m_TargetDirection.y = 0;
    }

    void ComputeRotation()
    {
        Vector3 cameraDirection = Quaternion.Euler(
            0,
            m_Camera.transform.rotation.eulerAngles.y,
            0) * Vector3.forward;


        Quaternion targetRotation;

        if (Mathf.Approximately(Vector3.Dot(m_Movement.normalized, Vector3.forward), -1.0f))
        {
            targetRotation = Quaternion.LookRotation(-cameraDirection);
        }
        else
        {
            Quaternion movementRotation = Quaternion.FromToRotation(Vector3.forward, m_Movement.normalized);
            targetRotation = Quaternion.LookRotation(movementRotation * cameraDirection);
        }

        m_TargetRotation = targetRotation;
    }
}
