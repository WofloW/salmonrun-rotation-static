import moment from "moment"
import _ from "lodash"
import maps from "../../maps"
import weapons from "../../weapons"
import React from "react"
import rotations from '../../rotations'
import hats from '../../gear-hats'
import clothes from '../../gear-clothes'
import shoes from '../../gear-shoes'

export default function Card ({phase, index}){
const reward = _.find(rotations.MonthlyRewardGears, {DateTime: phase.StartDateTime})
  console.log(reward)
  const rewardType = reward.GearKind
  let database
  switch(rewardType){
    case 'cHead':
      database = hats
      break
    case 'cShoes':
      database = shoes
      break
    case 'cClothes':
      database = clothes
      break
  }

  const rewardGear = _.get(_.find(database, {Id: reward.GearID}), 'ModelName')
  const start = moment(phase.StartDateTime + '+00:00')
  const end = moment(phase.EndDateTime + '+00:00')
  let remaining = null
  if (index === 0 && start.isBefore(moment())) {
    const diff = end.diff(moment())
    const duration = moment.duration(diff)
    remaining =
      <div>{`距离结束：${duration.days() > 0 ? `${duration.days()}天` : ''}${duration.hours() > 0 ? `${duration.hours()}小时` : ''}${duration.minutes()}分钟`}</div>
  }
  return <div className='card'>
    {remaining}
    <div>
      开始时间：{start.format('lll')}
    </div>
    <div style={{marginBottom: 20}}>
      结束时间：{end.format('lll')}
    </div>
    <div>
      {/*<div>{phase.StageID}</div>*/}
      <div><img style={{width: '100%'}}
                src={`https://woflow.github.io/salmonrun-rotation-static/stages/${_.find(maps, {Id: phase.StageID}).MapFileName}.png`}/>
      </div>
    </div>
    <div style={{textAlign: 'center'}}>
      <div style={{maxWidth: 625, display: 'inline-block'}}>
        {
          _.map(phase.WeaponSets, (weapon, index) => {
            let weaponName
            if (_.find(weapons, {Id: weapon})) {
              weaponName = `Wst_${_.find(weapons, {Id: weapon}).Name}`
            } else if (weapon === -1) {
              weaponName = 'questionmark'
            } else {
              weaponName = 'questionmark2'
            }
            return <div key={index} style={{display: 'inline-block', width: '25%'}}>
              <img style={{width: '90%'}}
                   src={`https://woflow.github.io/salmonrun-rotation-static/weapons/${weaponName}.png`}/>
            </div>
          })
        }
      </div>
    </div>
    {
      _.includes(phase.WeaponSets, -1) &&
      <img
        style={{width: '25%'}}
        src={`https://woflow.github.io/salmonrun-rotation-static/weapons/Wst_${_.find(weapons, {Id: phase.RareWeaponID}).Name}.png`}/>
    }
    <div>
      <img style={{width: '25%'}}
           src={`https://woflow.github.io/salmonrun-rotation-static/gear/${rewardGear}.png`}/>
    </div>

  </div>
}
