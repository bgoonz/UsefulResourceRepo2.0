using UnityEngine;

public static class GameObjectEfx
{
    public static void DrawCircle(this GameObject container, float radius, float lineWidth)
    {
        var segments = 360;
        var lineRenderer = container.AddComponent<LineRenderer>();

        lineRenderer.useWorldSpace = false;
        lineRenderer.startWidth = lineWidth;
        lineRenderer.endWidth = lineWidth;
        lineRenderer.positionCount = segments + 1;

        var points = new Vector3[lineRenderer.positionCount];

        for (int i = 0; i < points.Length; i++)
        {
            var rad = Mathf.Deg2Rad * i;

            points[i] = new Vector3(Mathf.Cos(rad) * radius, 0, Mathf.Sin(rad) * radius);
        }

        lineRenderer.SetPositions(points);
    }
}