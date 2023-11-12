"use client";
import React, { useState } from "react";
import style from "@/app/page.module.css";
import PlaneContext from "./PlaneContext";
import Building from "@/types/Building";
import Plane from "@/types/Plane";

// Interface of whiteboard in the future should be a class with mothods
interface WhiteBoard {
  plane: Plane;
  //owner: User for future user with User
  // memebers:[User] for future use with Users
}

function WhiteBoardContext() {
  const [height, setHeight] = useState(85400);
  const [width, setWidth] = useState(91800);
  const [heightPerc, setHeightPerc] = useState(100);
  const [widthPerc, setWidthPerc] = useState(100);
  const [scale, setScale] = useState<boolean>(false);

  // Temporary data for the building , this one is hardcoded 
  const data = {
      "story1": {
        "slabs": {
          "43": [
            [5.85, 33.95],
            [11.6996, 33.95],
            [11.6996, 39.8],
            [5.85, 39.8]
          ],
          "44": [
            [11.6996, 33.95],
            [17.55, 33.95],
            [17.55, 39.8],
            [11.6996, 39.8]
          ],
          "45": [
            [5.85, 17.55],
            [11.6996, 17.55],
            [11.6996, 28.1],
            [5.85, 28.1]
          ],
          "46": [
            [5.85, 28.1],
            [11.6996, 28.1],
            [11.6996, 33.95],
            [5.85, 33.95]
          ],
          "47": [
            [11.6996, 17.55],
            [17.55, 17.55],
            [17.55, 28.1],
            [11.6996, 28.1]
          ],
          "48": [
            [11.6996, 28.1],
            [17.55, 28.1],
            [17.55, 33.95],
            [11.6996, 33.95]
          ],
          "49": [
            [17.55, 28.1],
            [22.25, 28.1],
            [22.25, 33.95],
            [17.55, 33.95]
          ],
          "50": [
            [17.55, 33.95],
            [22.25, 33.95],
            [22.25, 39.8],
            [17.55, 39.8]
          ],
          "51": [
            [22.25, 28.1],
            [28.1, 28.1],
            [28.1, 33.95],
            [22.25, 33.95]
          ],
          "52": [
            [22.25, 33.95],
            [28.1, 33.95],
            [28.1, 39.8],
            [22.25, 39.8]
          ],
          "53": [
            [28.1, 28.1],
            [33.95, 28.1],
            [33.95, 33.95],
            [28.1, 33.95]
          ],
          "54": [
            [33.95, 28.1],
            [37.0, 28.1],
            [37.0, 33.95],
            [33.95, 33.95]
          ],
          "55": [
            [37.0, 28.1],
            [39.3, 28.1],
            [39.3, 33.95],
            [37.0, 33.95]
          ],
          "56": [
            [28.1, 33.95],
            [33.95, 33.95],
            [33.95, 39.8],
            [28.1, 39.8]
          ],
          "57": [
            [33.95, 33.95],
            [37.0, 33.95],
            [37.0, 39.8],
            [33.95, 39.8]
          ],
          "58": [
            [37.0, 33.95],
            [39.3, 33.95],
            [39.3, 39.8],
            [37.0, 39.8]
          ]
        },
        "walls": {
          "line": {
            "2": [
              [17.55, 33.95],
              [11.6996, 33.95]
            ],
            "9": [
              [17.55, 28.1],
              [17.55, 33.95]
            ],
            "10": [
              [11.6996, 20.200000000000003],
              [11.6996, 28.1]
            ],
            "11": [
              [17.55, 35.599999999999994],
              [17.55, 39.8]
            ],
            "1": [
              [5.85, 28.1],
              [5.85, 17.55]
            ],
            "13": [
              [5.85, 39.8],
              [5.85, 33.95]
            ],
            "14": [
              [11.6996, 39.8],
              [5.85, 39.8]
            ],
            "15": [
              [28.1, 39.8],
              [22.25, 39.8]
            ],
            "16": [
              [28.1, 28.1],
              [22.25, 28.1]
            ],
            "17": [
              [39.3, 28.1],
              [37.0, 28.1]
            ],
            "19": [
              [37.0, 39.8],
              [39.3, 39.8]
            ],
            "20": [
              [39.3, 30.440000034868717],
              [39.3, 28.1]
            ],
            "21": [
              [39.3, 32.78000006973743],
              [39.3, 30.440000034868717]
            ],
            "24": [
              [39.3, 39.8],
              [39.3, 37.46000013947487]
            ],
            "29": [
              [15.209840139484406, 17.55],
              [14.039760034871101, 17.55]
            ],
            "30": [
              [16.3799200697422, 17.55],
              [15.209840139484406, 17.55]
            ],
            "31": [
              [17.55, 17.55],
              [16.3799200697422, 17.55]
            ],
            "32": [
              [17.55, 19.660000031441452],
              [17.55, 17.55]
            ],
            "33": [
              [17.55, 21.7700000628829],
              [17.55, 19.660000031441452]
            ],
            "38": [
              [22.25, 30.440000034868717],
              [22.25, 28.1]
            ],
            "42": [
              [22.25, 39.8],
              [22.25, 37.46000013947487]
            ],
            "59": [
              [33.95, 33.95],
              [37.0, 33.95]
            ],
            "60": [
              [28.1, 33.95],
              [33.95, 33.95]
            ]
          },
          "box": {
            "2": [
              [17.55, 33.85],
              [11.6996, 33.85],
              [11.6996, 34.050000000000004],
              [17.55, 34.050000000000004]
            ],
            "9": [
              [17.45, 28.1],
              [17.45, 33.95],
              [17.650000000000002, 33.95],
              [17.650000000000002, 28.1]
            ],
            "10": [
              [11.5996, 20.200000000000003],
              [11.5996, 28.1],
              [11.7996, 28.1],
              [11.7996, 20.200000000000003]
            ],
            "11": [
              [17.45, 35.599999999999994],
              [17.45, 39.8],
              [17.650000000000002, 39.8],
              [17.650000000000002, 35.599999999999994]
            ],
            "1": [
              [5.949999999999999, 28.1],
              [5.949999999999999, 17.55],
              [5.75, 17.55],
              [5.75, 28.1]
            ],
            "13": [
              [5.949999999999999, 39.8],
              [5.949999999999999, 33.95],
              [5.75, 33.95],
              [5.75, 39.8]
            ],
            "14": [
              [11.6996, 39.699999999999996],
              [5.85, 39.699999999999996],
              [5.85, 39.9],
              [11.6996, 39.9]
            ],
            "15": [
              [28.1, 39.699999999999996],
              [22.25, 39.699999999999996],
              [22.25, 39.9],
              [28.1, 39.9]
            ],
            "16": [
              [28.1, 28.0],
              [22.25, 28.0],
              [22.25, 28.200000000000003],
              [28.1, 28.200000000000003]
            ],
            "17": [
              [39.3, 28.0],
              [37.0, 28.0],
              [37.0, 28.200000000000003],
              [39.3, 28.200000000000003]
            ],
            "19": [
              [37.0, 39.9],
              [39.3, 39.9],
              [39.3, 39.699999999999996],
              [37.0, 39.699999999999996]
            ],
            "20": [
              [39.4, 30.440000034868717],
              [39.4, 28.1],
              [39.199999999999996, 28.1],
              [39.199999999999996, 30.440000034868717]
            ],
            "21": [
              [39.4, 32.78000006973743],
              [39.4, 30.440000034868717],
              [39.199999999999996, 30.440000034868717],
              [39.199999999999996, 32.78000006973743]
            ],
            "24": [
              [39.4, 39.8],
              [39.4, 37.46000013947487],
              [39.199999999999996, 37.46000013947487],
              [39.199999999999996, 39.8]
            ],
            "29": [
              [15.209840139484406, 17.45],
              [14.039760034871101, 17.45],
              [14.039760034871101, 17.650000000000002],
              [15.209840139484406, 17.650000000000002]
            ],
            "30": [
              [16.3799200697422, 17.45],
              [15.209840139484406, 17.45],
              [15.209840139484406, 17.650000000000002],
              [16.3799200697422, 17.650000000000002]
            ],
            "31": [
              [17.55, 17.45],
              [16.3799200697422, 17.45],
              [16.3799200697422, 17.650000000000002],
              [17.55, 17.650000000000002]
            ],
            "32": [
              [17.650000000000002, 19.660000031441452],
              [17.650000000000002, 17.55],
              [17.45, 17.55],
              [17.45, 19.660000031441452]
            ],
            "33": [
              [17.650000000000002, 21.7700000628829],
              [17.650000000000002, 19.660000031441452],
              [17.45, 19.660000031441452],
              [17.45, 21.7700000628829]
            ],
            "38": [
              [22.35, 30.440000034868717],
              [22.35, 28.1],
              [22.15, 28.1],
              [22.15, 30.440000034868717]
            ],
            "42": [
              [22.35, 39.8],
              [22.35, 37.46000013947487],
              [22.15, 37.46000013947487],
              [22.15, 39.8]
            ],
            "59": [
              [33.95, 34.050000000000004],
              [37.0, 34.050000000000004],
              [37.0, 33.85],
              [33.95, 33.85]
            ],
            "60": [
              [28.1, 34.050000000000004],
              [33.95, 34.050000000000004],
              [33.95, 33.85],
              [28.1, 33.85]
            ]
          }
        }
      }
    }
  // -------------------

  return (
    <div
      className={style.canvasBox}
      style={{ touchAction: "none", overflow: "scroll" }}
    >
      <div
        id="canvaId"
        className={style.canvas}
        style={{
          width: width,
          minWidth: width,
          height: height,
          minHeight: height,
        }}
      >
        <div
          className={style.layer_wrapper}
          style={{
            transform: `scale(${scale})`,
            height: `${heightPerc}%`,
            width: `${widthPerc}%`,
          }}
        >
          <div className={style.canvas_grid} />
          <PlaneContext PlaneId="Plane_1" Building={new Building(data,"B-1")} />
        </div>
      </div>
    </div>
  );
}

export default WhiteBoardContext;
