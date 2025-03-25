import {LoginPage} from "@/pages/LoginPage";
import {Suspense, useState} from "react";
import {AppRouter} from "@/app/providers/Router";

export const App = () => {

    const [visible, setVisible] = useState(false)

  return (
    <div className={'App'}>
        <button onClick={() => setVisible(prev => !prev)}>показать/скрыть login</button>
        1231231
        <Suspense>
            <AppRouter/>
        </Suspense>
    </div>
  )
}