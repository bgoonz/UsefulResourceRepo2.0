using UnityEditor;
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    const float k_Acceleration = 20.0f;
    const float k_Deceleration = 35.0f;

    public float maxForwardSpeed = 8.0f;
    public float rotationSpeed;
    public float m_MaxRotationSpeed = 1200;
    public float m_MinRotationSpeed = 800;

    private Quaternion m_TargetRotation;

    private float m_DesiredForwardSpeed;
    public float m_ForwardSpeed;
    private Vector3 m_Movement;

    public Vector3 MoveInput
    {
        get
        {
            return m_Movement;
        }
    }

    public bool IsMoveInput
    {
        get
        {
            return !Mathf.Approximately(MoveInput.magnitude, 0);
        }
    }

    private void Awake()
    {

    }

    private void Update()
    {
        m_Movement.Set(
            Input.GetAxis("Horizontal"),
            0,
            Input.GetAxis("Vertical")
        );
    }

    private void FixedUpdate()
    {
        ComputeMovement();
        ComputeRotation();

        if (IsMoveInput)
        {
            float rotationSpeed = Mathf.Lerp(m_MaxRotationSpeed, m_MinRotationSpeed, m_ForwardSpeed / m_DesiredForwardSpeed);
            m_TargetRotation = Quaternion.RotateTowards(
                transform.rotation,
                m_TargetRotation,
                rotationSpeed * Time.fixedDeltaTime);

            transform.rotation = m_TargetRotation;
        }
    }

    private void ComputeMovement()
    {
        Vector3 moveInput = MoveInput.normalized;
        m_DesiredForwardSpeed = moveInput.magnitude * maxForwardSpeed;

        float acceleration = IsMoveInput ? k_Acceleration : k_Deceleration;

        m_ForwardSpeed = Mathf.MoveTowards(
            m_ForwardSpeed,
            m_DesiredForwardSpeed,
            Time.fixedDeltaTime * acceleration);
    }

    private void ComputeRotation()
    {
        Vector3 moveInput = MoveInput.normalized;
        Vector3 cameraDirection = Quaternion.Euler(
            0,
            Camera.main.transform.rotation.eulerAngles.y,
            0) * Vector3.forward;

        Quaternion targetRotation;

        if (Mathf.Approximately(Vector3.Dot(moveInput, Vector3.forward), -1.0f))
        {
            targetRotation = Quaternion.LookRotation(-cameraDirection);
        }
        else
        {
            Quaternion movementRotation = Quaternion.FromToRotation(Vector3.forward, moveInput);
            targetRotation = Quaternion.LookRotation(movementRotation * cameraDirection);
        }

        m_TargetRotation = targetRotation;
    }
}
