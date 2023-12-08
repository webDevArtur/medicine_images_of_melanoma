import React, { useState } from 'react';
import styles from './multilevelselect.css';
import { useSelector } from 'react-redux';
import { IRootState, useAppDispatch } from '../../redux/redux-store';
import { setAttribute, setOpenAttr, setSelectedItem } from '../../redux/templates/templates-reducer';
import { generateRandomString } from '../../utils/generateRandomIndex';
import classNames from 'classnames';

export interface ISelectItem{
  id: string;
  name: string;
  children?: ISelectItem[];
}

interface IMultilevelSelect{
  items: ISelectItem[],
}

export function MultilevelSelect({ items}: Readonly<IMultilevelSelect>) {
  const dispatch = useAppDispatch();

  const {openAttr, selectedItem} = useSelector((state: IRootState) => state.templates);

  function handleClickOpen(e: React.MouseEvent<HTMLButtonElement>){
    const newOpenAttr = [...openAttr];
    const index = newOpenAttr.indexOf(e.currentTarget.id);
    if (index >= 0){
      newOpenAttr.splice(index, 1);
    } else {
      newOpenAttr.push(e.currentTarget.id);
    };
    dispatch(setOpenAttr(newOpenAttr));
  };

  function handleClickAttribute(e: React.MouseEvent<HTMLDivElement>){
    const attrAray: Array<string> = [];
    const target = e.currentTarget;
    attrAray.unshift(target.title);
    const parent = target.parentElement?.parentElement;
    const btn = parent?.querySelector('button');
    if (parent?.ariaLabel === 'selectBlock' && btn) {
      attrAray.unshift(btn.title);
      addParentAttr(btn, attrAray);
    };
    dispatch(setAttribute(attrAray));
    dispatch(setSelectedItem(target.id));
  };

  function addParentAttr(elem: HTMLElement, attrAray: Array<string>){
    const parent = elem.parentElement?.parentElement?.parentElement;
    const btn = parent?.querySelector('button');
    if (parent?.ariaLabel === 'selectBlock' && btn) {
      attrAray.unshift(btn.title);
      addParentAttr(btn, attrAray);
    };
  };

  return (
      <div className={styles.select}>
        {items.map((item) => {
            if (item.children){
              return (
                <div aria-label='selectBlock' key={generateRandomString()} className={styles.selectBlock}>
                  <button title={item.name} id={item.id}  className={styles.selectBtn} onClick={handleClickOpen}>
                    <span className={styles.selectText}>{item.name}</span>
                    <span className={openAttr.indexOf(item.id)>=0 ? styles.rotate : undefined}>
                      <svg width="14" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.3417 8.91208C14.966 9.29821 14.3477 9.30437 13.9644 8.92579L8.14183 3.17475C8.06342 3.0973 7.93715 3.09788 7.85945 3.17603L2.15281 8.91591C1.76725 9.30371 1.14293 9.3137 0.745162 8.93845C0.335488 8.55196 0.321627 7.90488 0.714373 7.5012L7.28326 0.749487C7.67588 0.345934 8.32412 0.345934 8.71674 0.749487L15.3417 7.55884C15.7082 7.93549 15.7082 8.53542 15.3417 8.91208Z" fill="#241b48"/>
                      </svg>
                    </span>
                  </button>
                  {openAttr.indexOf(item.id)>=0 && <MultilevelSelect items={item.children}/>}
              </div>
              )
            } else {
              return <div key={generateRandomString()} id={item.id} title={item.name} className={selectedItem===item.id ? classNames(styles.selectedItem, styles.item) : styles.item} onClick={handleClickAttribute}>
                {item.name}
              </div>
            }
        })}
        
      </div>
  );
};
