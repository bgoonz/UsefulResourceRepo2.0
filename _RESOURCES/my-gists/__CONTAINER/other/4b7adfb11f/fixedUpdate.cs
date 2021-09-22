void FixedUpdate()
    {
        float horizontalInput = Input.GetAxis("Horizontal");
        float verticalInput = Input.GetAxis("Vertical");

        Vector3 playerPos = m_Rb.position;
        Vector3 movement = new Vector3(horizontalInput, 0, verticalInput).normalized;
        Quaternion targetRotation;

        if (movement == Vector3.zero)
        {
            targetRotation = transform.rotation;
        }
        else
        {
            targetRotation = Quaternion.LookRotation(movement);
        }

        if (m_Elevator != null)
        {
            playerPos.y = m_Elevator.transform.position.y + m_ElevatorOffsetY;
        }

        targetRotation = Quaternion.RotateTowards(
            transform.rotation,
            targetRotation,
            360 * Time.fixedDeltaTime);

        m_Rb.MovePosition(playerPos + movement * m_SpeedModifier * speed * Time.fixedDeltaTime);
        m_Rb.MoveRotation(targetRotation);
    }