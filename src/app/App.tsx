import {LoginPage} from "@/pages/LoginPage";
import {Suspense, useState} from "react";

export const App = () => {

    const [visible, setVisible] = useState(false)

  return (
    <div className={'App'}>
        <button onClick={() => setVisible(prev => !prev)}>показать/скрыть login</button>
        <Suspense>
            {visible && <LoginPage/>}
        </Suspense>
    </div>
  )
}