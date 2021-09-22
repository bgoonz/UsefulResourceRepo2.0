using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace ActionRpg
{
    public class PlayerMovement : MonoBehaviour
    {
        private const float k_Acceleration = 20f;
        private const float k_Deceleration = 25f;
        public float moveSpeed;
        public float rotationSpeed;
        private PlayerInput m_input;

        private CharacterController myController;
        private Animator myAnim;
        private Quaternion m_rotation;
        private readonly int m_HashForwardSpeed = Animator.StringToHash("ForwardSpeed");

        private Camera cam;

        private float m_desiredForwSpeed;
        private float m_forwardSpeed;

        public float maxForwardSpeed = 8f;
        // Start is called before the first frame update
        void Awake()
        {
            myController = GetComponent<CharacterController>();
            m_input = GetComponent<PlayerInput>();
            myAnim = GetComponent<Animator>();
            cam = Camera.main;

        }

        private void FixedUpdate()
        {
            ComputeMovement();
            // Vector2 moveInput = m_input.move_input;
            //  Vector3 localMovementInput = new Vector3(moveInput.x,0,moveInput.y);

            // Quaternion camRotation = cam.transform.rotation;
            // Vector3 targetDir = camRotation * localMovementInput;
            // targetDir.y = 0;

            // myController.Move(targetDir.normalized * moveSpeed * Time.deltaTime);

            //  myController.transform.rotation = Quaternion.Euler(0, camRotation.eulerAngles.y, 0);
        }

        private void OnAnimatorMove()
        {
            Debug.Log(m_input.move_input.normalized);
            Vector3 movement =
                myAnim.GetFloat(m_HashForwardSpeed) *
                m_input.move_input.normalized *
                Time.fixedDeltaTime;

            var gravity = -20;
            movement += gravity * Vector3.up * Time.fixedDeltaTime;

            myController.Move(movement);
        }

        private void ComputeMovement()
        {
            Vector3 moveInput = m_input.move_input.normalized;

            m_desiredForwSpeed = moveInput.magnitude * maxForwardSpeed;

            float acceleration = m_input.IsMove ? k_Acceleration : k_Deceleration;

            m_forwardSpeed = Mathf.MoveTowards(m_forwardSpeed, m_desiredForwSpeed, Time.fixedDeltaTime * 25);

            myAnim.SetFloat(m_HashForwardSpeed, m_forwardSpeed);
        }

    }
}


