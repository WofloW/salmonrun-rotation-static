import React, {useState} from 'react'
import './App.css'
import _ from 'lodash'
import moment from 'moment'
import 'moment/locale/zh-cn'
// import axios from 'axios'
import rotations from './rotations'
import Scrollable from './components/scrollable'
import Card from './components/card'

moment.locale('zh-cn')

let filtered = _.filter(rotations.Phases, (phase) => {
  const end = moment(phase.EndDateTime + '+00:00')
  return end.isAfter(moment())
})

function App() {
  const [showNumber, setShowNumber] = useState(5)
  const [map0, setMap0] = useState(true)
  const [map1, setMap1] = useState(true)
  const [map2, setMap2] = useState(true)
  const [map3, setMap3] = useState(true)
  const [map4, setMap4] = useState(true)
  const [isRandomWeapon, setIsRandomWeapon] = useState(false)
  const [isGolden, setIsGolden] = useState(false)
  let mapFiltered = _.filter(filtered, (rotation) => {
    if (map0 && rotation.StageID === 5000) {
      return true
    }
    if (map1 && rotation.StageID === 5001) {
      return true
    }
    if (map2 && rotation.StageID === 5002) {
      return true
    }
    if (map3 && rotation.StageID === 5003) {
      return true
    }
    if (map4 && rotation.StageID === 5004) {
      return true
    }
    return false
  })
  if (isRandomWeapon) {
    mapFiltered = _.filter(mapFiltered, (rotation) => {
      return _.includes(rotation.WeaponSets, -1)
    })
  }
  if (isGolden) {
    mapFiltered = _.filter(mapFiltered, (rotation) => {
      return _.includes(rotation.WeaponSets, -2)
    })
  }
  const takeRotation = _.take(mapFiltered, showNumber)

  if (window.location.search === '?access=138151784') {
    return (
      <Scrollable
        isBottom={() => {
          setShowNumber(showNumber + 5)
        }}
      >
        <div className="App">
          <h3>Splatoon 2 Salmon Run rotation</h3>
          <h3>乌贼2打工时间表</h3>
          <div style={{fontSize: 12, marginBottom: 10}}>夜风制作 打工qq群: 138151784</div>
          <div style={{fontWeight: 400}}>
            <div style={{'user-select': 'none'}}>
              <label className={`${map0 ? 'golden': null} clickable`}>破坝<input type='checkbox' checked={map0} onChange={() => {
                setMap0(!map0)
              }}/></label>
              <label className={`${map1 ? 'golden': null} clickable`}>破船<input type='checkbox' checked={map1} onChange={() => {
                setMap1(!map1)
              }}/></label>
              <label className={`${map2 ? 'golden': null} clickable`}>破屋<input type='checkbox' checked={map2} onChange={() => {
                setMap2(!map2)
              }}/></label>
              <label className={`${map3 ? 'golden': null} clickable`}>臭水沟<input type='checkbox' checked={map3} onChange={() => {
                setMap3(!map3)
              }}/></label>
              <label className={`${map4 ? 'golden': null} clickable`}>破楼<input type='checkbox' checked={map4} onChange={() => {
                setMap4(!map4)
              }}/></label>
            </div>
            <div>
              <label className={`${isRandomWeapon ? 'golden': null} clickable`}>只看绿随机<input type='checkbox' checked={isRandomWeapon} onChange={() => {
                setIsRandomWeapon(!isRandomWeapon)
              }}/></label>
              <label className={`${isGolden ? 'golden': null} clickable`}>只看金随机<input type='checkbox' checked={isGolden} onChange={() => {
                setIsGolden(!isGolden)
              }}/></label>
            </div>
          </div>
          <div style={{fontSize: 11}}>
            <div>This website is built for Chinese players only who can't access oatmealdome website.</div>
            <div>Rotation data from <a href='https://content.oatmealdome.me/bcat/salmon_run'>oatmealdome.me</a></div>
            <div>Images from <a href='https://leanny.github.io'>leanny.github.io</a></div>
          </div>
          {
            _.map(takeRotation, (phase, index) => {
              return <Card phase={phase} key={phase.StartDateTime} index={index}/>
            })
          }
        </div>
      </Scrollable>
    )
  } else {
    return <div><h1>404 Not Found</h1></div>
  }
}

export default App
