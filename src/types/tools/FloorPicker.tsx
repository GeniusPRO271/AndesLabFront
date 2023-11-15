import Icon from "@/assets/Icons/icon";
import ITool from "../interfaces/ITool";
import style from "@/app/page.module.css";
import { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeActiveFloor,
  selectActiveFloor,
  selectFloors,
} from "@/app/redux/slices/floorSlice";
import Floor from "../Floor";
import { motion } from "framer-motion";
import { ButtonState, changeActiveButton, changeIsButtonActive, selectActiveButton, selectIsbuttonActive } from "@/app/redux/slices/buttonSlice";
import { BlobOptions } from "buffer";

export default class FloorPicker implements ITool {
  Id: string;
  Icon: Icon | null;
  ActiveFloor: string;
  IsPopUpOpen: boolean;

  constructor(id: string) {
    this.Id = id;
    this.Icon = null;
    this.IsPopUpOpen = false;
    this.ActiveFloor = "S1";
  }

  private popUp(floorsString: any[], activeButton:string, IsbuttonActive:boolean): ReactNode {
    const dispatch = useDispatch();
    const activeFloor = useSelector(selectActiveFloor);
    const floors = floorsString.map((floor) => {
      return JSON.parse(floor);
    });
    let floor: Array<Floor> = [];
    for (const key in floors) {
      for (const story in floors[key]) {
        let newFloor = new Floor(key, floors[key][story], story);
        floor.push(newFloor);
      }
    }

    const panel = {
      NotActive: {
        opacity: 0,
        x:-30,
      },
      Active: {
        opacity: 1,
        x:0,
        transition: {
          duration: 0.15,
        }
      },
    };
    const panelSide = {
      NotActive: {
        opacity: 0,
        x:-30,
      },
      Active: {
        opacity: 1,
        x:0,
        transition: {
          duration: 0.15,
          delayChildren: 0,
          staggerChildren: 0.1
        }
      },
    };
    const panelSideButton = {
      NotActive: { opacity: 0, y: 10},
      Active: {
        opacity: 1,
        y: 0
      }
    };

    return (
      
      <div id="FloorPickerPanel" style={IsbuttonActive ? {position:"relative",top:0, zIndex: -1, display:"block"} : {position:"relative",top:0, zIndex: -1, display:"none"}}>
        <motion.div
          className={style.basicPanel}
          variants={panel} animate={IsbuttonActive ? "Active" : "NotActive"}
        >
          {floor.map((data) => {
            if (activeFloor == data.FloorNumber) {
              return (
                <div
                  className={style.basicPanelContainer}
                  id={"panelFloor" + data.FloorNumber}
                >
                  <div
                    className={style.ActiveFloorTitle}
                    key={data.FloorNumber}
                  >
                    {data.FloorNumber}
                  </div>
                  <div className={style.WallListText} key={data.FloorNumber}>
                    Lista de Muros:
                  </div>
                  <div className={style.WallListTextButtonContainer}>
                    {data.Layers &&
                      data.Layers.map((layerName) => {
                        {
                          if (layerName.Id == "walls") {
                            return layerName.CoordsGroup.map((layer) => {
                              return (
                                <button
                                  className={style.WallListTextButton}
                                  key={data.FloorNumber}
                                >
                                  A-{layer.Id}
                                </button>
                              );
                            });
                          }
                        }
                      })}
                  </div>
                </div>
              );
            }
          })}
        </motion.div>
        <motion.div
          className={style.floorsSidePanel}
          variants={panelSide} animate={IsbuttonActive ? "Active" : "NotActive"}
        >
          {floor.map((data) => {
            return (
              <motion.button
                className={style.floorsSidePanelItem}
                variants={panelSideButton}
                style={
                  activeFloor == data.FloorNumber
                    ? { backgroundColor: "#e4e4e4" }
                    : {}
                }
                onClick={() => {
                  dispatch(changeActiveFloor(data.FloorNumber));
                }}
              >
                {data.FloorNumber}
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    );
  }
  render(): ReactNode {
    const floorsString = useSelector(selectFloors);
    const activeFloor = useSelector(selectActiveFloor);
    const activeButton = useSelector(selectActiveButton)
    const buttonState = useSelector(selectIsbuttonActive)
    const dispatch = useDispatch()
    return (
      <div className={style.toolBarItem} id={this.Id} key={this.Id}>
        {this.popUp(floorsString,activeButton,buttonState)}
        <button
          className={style.toolBarbutton}
          onClick={() => {
            if(activeButton != this.Id){
              dispatch(changeActiveButton(this.Id))
            } 
            if(buttonState == true){
              dispatch(changeIsButtonActive(false))
            } else if(buttonState == false){
              dispatch(changeIsButtonActive(true))
            }
          }}
        >
          {activeFloor}
        </button>
      </div>
    );
  }
}
