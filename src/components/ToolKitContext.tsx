"use client"

import ToolKit from "@/types/tools/Tool";
import LayerToggle, { PlantaArquitectureToggle } from "@/types/tools/LayerToggle";
import React from "react";
import style from "@/app/page.module.css"
import { ArquitectureIcon, JoinIcon, Pencil, SlabIcon, WallIcon } from "@/assets/Icons/icon";
import FloorPicker from "@/types/tools/FloorPicker";
import { motion } from "framer-motion";
import Drawing from "@/types/tools/Drawing";

function ToolKitContext() {

  const WallLayerToggle = new LayerToggle("W-Num","wall", new WallIcon(), "walls")
  const SlabLayerToggle = new LayerToggle("S-Num","slab", new SlabIcon(), "slabs")
  const PlantaArquiToggle = new PlantaArquitectureToggle("PlantaArquiToogle","PlantaArqui1", new ArquitectureIcon(), "PlantaArqui2")
  const DrawingTool = new Drawing("DRAWING_TOGGLE","DRAWING", new Pencil())
  const FloorPickerButton = new FloorPicker("S")



  const container = {
    hidden: { x: -100 , opacity: 0},
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const toolKit = new ToolKit("ToolKit", [FloorPickerButton,WallLayerToggle,SlabLayerToggle, PlantaArquiToggle, DrawingTool] )
  return (
    <motion.div className={style.toolBar} id={toolKit.Id} variants={container} initial="hidden" animate="visible">
          <div className={style.toolBarButtons}>
            {toolKit && toolKit.Tools.map((tool) => {
                return(
                  <motion.div key={tool.Id} variants={item}>
                   { tool.render()}
                  </motion.div>
                )
            })}
          </div>
    </motion.div>
  );
}


export default ToolKitContext;
