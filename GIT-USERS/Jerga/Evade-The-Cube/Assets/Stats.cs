using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Stats : MonoBehaviour
{
    public float health;

    public void UpdateHealth(float value)
    {
        health -= value;
    }
}
