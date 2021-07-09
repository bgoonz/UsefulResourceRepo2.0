import numpy as np
import matplotlib.pyplot as plt


plt.rcParams['font.family'] = 'MEIRYO'
plt.rcParams["font.size"] = 18

w, h, dpi = 1920, 1080, 144
fig = plt.figure(figsize=(w / dpi, h / dpi), dpi=dpi, facecolor='white')

x = np.arange(-0.2, 7, 0.001)
y1 = 3 * np.sin(x)
y2 = 2.3 * np.sin(x )
plt.xticks(np.linspace(0, np.pi * 2.5, num=6, endpoint=True))
plt.yticks(np.linspace(-11, 11, num=23, endpoint=True))

plt.grid(True)

plt.plot(x, y1, label="電流")
plt.plot(x, y2, label='両端電圧')

plt.legend()
plt.legend(bbox_to_anchor=(1, 1), loc='upper right', borderaxespad=1)

plt.show()