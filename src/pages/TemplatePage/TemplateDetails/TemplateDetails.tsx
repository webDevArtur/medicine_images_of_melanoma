import React from 'react';
import styles from './templatedetails.css';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../redux/redux-store';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

export function TemplateDetails() {
    const template = useSelector((state: IRootState) => state.templates.template);

    return (
        <div className={styles.detailsBlock}>
            <TransformWrapper initialScale={1}>
                {({ zoomIn, zoomOut, resetTransform }) => (
                    <React.Fragment>
                        <TransformComponent>
                            <img className={styles.img} src={template.url} alt="Template" />
                        </TransformComponent>
                        <div className={styles.buttonContainer}>
                            <button className={styles.button} onClick={()=>zoomIn()}>
                                +
                            </button>
                            <button className={styles.button} onClick={()=>resetTransform()}>
                            x
                            </button>
                            <button className={styles.button} onClick={()=>zoomOut()}>
                                -
                            </button>
                        </div>
                    </React.Fragment>
                )}
            </TransformWrapper>
        </div>
    );
}
