import dog from "../../img/girl.png"
import "../../css/style.css"

export const MainDescription = () => {


    return (

        <div className="description container">
            <div className="description-col">
                <div className="description-item">
                    <div className="description-header">Передержка у догситтера</div>
                    <p className="description-text">Возьмем вашего питомца в гости, пока вы в отпуске, и будем о нем заботиться</p>
                </div>
                <div>
                    <p className="description-header">Выгул питомца</p>
                    <p className="description-text">Погуляем и поиграем с вашим питомцем, чтобы дома вас ждал счастливый пес</p>
                </div>
            </div>
            <div className="description-col">
                <img className="img-description" src={dog} alt="dog" ></img>
            </div>
            <div className="description-col">
                <div className="description-item">
                    <p className="description-header">Дневная няня</p>
                    <p className="description-text">Придем к вам, если питомец требует внимания или заболел</p>
                </div>
                <div>
                    <p className="description-header">Забота как дома</p>
                    <p className="description-text">У нас есть догситтеры для всех типов собак: и для маленьких йорков, и для больших овчарок, и для щенков, и для пожилых питомцев</p>
                </div>
            </div>
        </div>


    )
}

