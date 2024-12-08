import React, { useState } from "react"

import type { CleanProject, Fractions } from "~types/project"

type Props = {
  fraction: Fractions
}

const FractionCard = ({ fraction }: Props) => {
  //console.log("fraction render", fraction)
  return (
    <div className="grid grid-cols-3 gap-4">
      <div>
        Ref. : <span className="text-blue-500">{fraction.Ref}</span>
      </div>
      <div>
        Piso : <span className="text-blue-500">{fraction.Piso}</span>
      </div>
      <div>
        Fração : <span className="text-blue-500">{fraction.Fraçao}</span>
      </div>
      <div>
        Tipologia : <span className="text-blue-500">{fraction.Tipologia}</span>
      </div>
      <div>
        Area Privativa :{" "}
        <span className="text-blue-500">{fraction.AreaPrivativa}</span>
      </div>
      <div>
        Area Exterior :{" "}
        <span className="text-blue-500">{fraction.AreaExterior}</span>
      </div>
      <div>
        Area Total : <span className="text-blue-500">{fraction.AreaTotal}</span>
      </div>
      <div>
        Estacionamento :{" "}
        <span className="text-blue-500">{fraction.Estacionamento}</span>
      </div>
      <div>
        Preço : <span className="text-blue-500">{fraction.Price}</span>
      </div>
    </div>
  )
}

export default FractionCard
