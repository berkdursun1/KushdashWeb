import React, { useEffect } from 'react'
import Styles from './card.module.css'
import { GuessedPlayer, GuessTips} from '@/app/models/guessResponse'

const player = ({guessResponse, guessTips=null} : {guessResponse: GuessedPlayer, guessTips: GuessTips | null}) => {
  return (
    <div className={Styles.leadCard}>
      <div className={Styles.playerCard}>
        <div className={Styles.photoBorder}>
        {guessResponse.imageUrl !== null ? <img src={guessResponse.imageUrl} className={Styles.playerPhoto} /> : <div className={Styles.nullPlayerPhoto}><label>?</label></div>}
        </div>
        <div className={Styles.playerInfo}>
          <h2 className={Styles.playerName}>{guessResponse.name ?? "?"}</h2>
          <div className={Styles.propertyWrapper}>
              <label className={Styles.labelText}>Position / Foot</label>
              <div className={Styles.inputField}>
                <label>{guessResponse.position ?? "?"}  / {guessResponse.foot ?? "?" }</label> 
                </div>
            </div>
          <div className={Styles.playerStats}>
            <div className={Styles.propertyWrapper}>
              <label className={Styles.labelText}>Age</label>
              <div className={Styles.inputField}>
                <label>{guessResponse.age ?? "?" }</label> 
                {guessResponse.age === undefined || guessResponse.age === null ? 
                  <label>({guessTips?.minAge ?? "?"}-{guessTips?.maxAge ?? "?"})
                  </label> 
                : null}</div>
            </div>
            <div className={Styles.propertyWrapper}>
              <label className={Styles.labelText}>Goals</label>
              <div className={Styles.inputField}>
                <label>{guessResponse.scores ?? "?" }</label> 
                {guessResponse.scores === undefined || guessResponse.scores === null ? 
                  <label>({guessTips?.minGoal ?? "?"}-{guessTips?.maxGoal ?? "?"})
                  </label> 
                : null}</div>
            </div>
            <div className={Styles.propertyWrapper}>
              <label className={Styles.labelText}>Assists</label>
              <div className={Styles.inputField}>
                <label>{guessResponse.asists ?? "?" }</label> 
                {guessResponse.asists === undefined || guessResponse.asists === null ? 
                  <label>({guessTips?.minAsist ?? "?"}-{guessTips?.maxAsist ?? "?"})
                  </label> 
                : null}</div>
            </div>
            <div className={Styles.propertyWrapper}>
              <label className={Styles.labelText}>Matches</label>
              <div className={Styles.inputField}>
                <label>{guessResponse.matchs ?? "?" }</label> 
                {guessResponse.matchs === undefined || guessResponse.matchs === null ? 
                  <label>({guessTips?.minMatchs ?? "?"}-{guessTips?.maxMatchs ?? "?"})
                  </label> 
                : null}</div>
            </div>
          </div>
          </div>
          <div className={Styles.teamsGrid}>
              {guessResponse.teams?.map((team, index) => (
                <div key={index} className={Styles.teams}>
                  {team}
                </div>
              ))}
            </div>
      </div>
      
    
    
</div>
    
  )
}

export default player