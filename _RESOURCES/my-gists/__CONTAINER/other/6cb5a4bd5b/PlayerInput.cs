using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace ActionRpg
{
    public class PlayerInput : MonoBehaviour
    {

        private Vector3 m_Movement;

        public Vector3 move_input
        {
            get { return m_Movement; }
        }

        public bool IsMove
        {
            get { return !Mathf.Approximately(move_input.magnitude, 0); }
        }


        // Update is called once per frame
        void Update()
        {
            m_Movement.Set(Input.GetAxis("Horizontal"),
            0,
            Input.GetAxis("Vertical"));
        }
    }
}


