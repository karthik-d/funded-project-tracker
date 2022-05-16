
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Header from '../header'
import Link from 'next/link';

export default function onProposal() {
    return(
    <div className={styles.onProposal}>
        <Header></Header>

        <form>
        <fieldset>
          
          <legend>
            Project proposal
          </legend>
          <box>
              <lable>Team Members</lable>
              <textarea></textarea>
            </box>
            <box>
                <label>project theme</label>
                <input type="text" value="with autocomplete"/>

            </box>
          
        </fieldset>
      </form>
      </div>
    );
}