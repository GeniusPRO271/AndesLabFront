import React, { ReactNode } from "react";
import BuildingLayer from "../BuildingLayer";
import Joints, { Joint } from "./Joints";
import { useDispatch } from "react-redux";
import { changeSelectedWall, changeShowWallInfo } from "@/redux/slices/wallSlice";
export default class Walls extends BuildingLayer {
  public WallNodes: Joints;
  public CoordsGroup: Array<Wall>;

  constructor(rawData: any, id: string) {
    super(rawData, id);
    this.Id = id;
    this.CoordsGroup = this.getCoords(rawData);
    this.RawData = rawData;
    this.WallNodes = new Joints(rawData.line, "wallNodes");
  }

  getCoords(rawData: any) {
    try {
      let coordsGroup: Array<Wall> = [];
      if (rawData.box) {
        for (const coords in rawData.box) {
          let coordsDATA = new Wall(coords, rawData.box[coords], "red", "red");
          coordsGroup.push(coordsDATA);
        }
      }
      return coordsGroup;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  render(): ReactNode {
    return (
      <>
        <g id={this.Id} key={"walls_" + this.Id}>
          {this.CoordsGroup.map((wall: Wall) => {
            return wall.render();
          })}
        </g>
        <g id={this.WallNodes.Id} key={"joins_" + this.WallNodes.Id}>
          {this.WallNodes.CoordsGroup.map((joint: Joint) => {
            return <g key={"group" + joint.Id}>{joint.render()}</g>;
          })}
        </g>
      </>
    );
  }
}
export class Wall implements ILayer {
  public Coords: Array<Array<number>>;
  public Id: string;
  public Color: string;
  public FillColor: string;
  public lineCords: Array<number>;

  constructor(
    id: string,
    coords: Array<Array<number>>,
    color: string,
    fillColor: string
  ) {
    this.Id = id;
    this.Coords = coords;
    this.Color = color;
    this.FillColor = fillColor;
    this.lineCords = this.getLineCords(coords);
  }

  getLineCords(data: Array<Array<number>>) {
    const xValues = data.map((coord) => coord[0]);
    const yValues = data.map((coord) => coord[1]);

    const xMidpoint = (Math.min(...xValues) + Math.max(...xValues)) / 2;
    const yMidpoint = (Math.min(...yValues) + Math.max(...yValues)) / 2;

    return [xMidpoint, yMidpoint];
  }
  SerializedWall(){
    return {
        Coords: this.Coords,
        Id: this.Id,
        Color: this.Color,
        FillColor: this.FillColor,
        lineCords: this.lineCords
    }
  }

  render(): React.ReactNode {
    const dispatch = useDispatch()
    return (
      <polygon
        points={`
            ${this.Coords[0][0] * 20 + 100},${this.Coords[0][1] * 20} 
            ${this.Coords[1][0] * 20 + 100},${this.Coords[1][1] * 20} 
            ${this.Coords[2][0] * 20 + 100},${this.Coords[2][1] * 20} 
            ${this.Coords[3][0] * 20 + 100},${this.Coords[3][1] * 20}`}
            
        onClick={() => {
            dispatch(changeSelectedWall(this.SerializedWall()))
            dispatch(changeShowWallInfo(true))
        }}

        stroke={this.Color}
        fill={this.FillColor}
        id={this.Id}
        key={"wall_" + this.Id}
        style={{ position: "absolute", zIndex: 100, cursor: "pointer" }}
      ></polygon>
    );
  }
}
