using System.Collections;
using System.Collections.Generic;
using Cinemachine;
using UnityEngine;

public class CameraController : MonoBehaviour
{
    [SerializeField]
    CinemachineFreeLook freeLookCamera;

    public CinemachineFreeLook PlayerCam
    {
        get
        {
            return freeLookCamera;
        }
    }

    // Update is called once per frame
    void Update()
    {
        if (Input.GetMouseButtonDown(1))
        {
            PlayerCam.m_XAxis.m_MaxSpeed = 400;
            PlayerCam.m_YAxis.m_MaxSpeed = 10;
        }

        if (Input.GetMouseButtonUp(1))
        {
            PlayerCam.m_XAxis.m_MaxSpeed = 0;
            PlayerCam.m_YAxis.m_MaxSpeed = 0;
        }
    }
}
