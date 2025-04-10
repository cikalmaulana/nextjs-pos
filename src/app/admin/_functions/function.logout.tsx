'use client';

import { TransitionStartFunction } from "react";
import { ACT_Logout } from "../_actions/action.logout";

export async function FUN_Logout(props: {
    transit: TransitionStartFunction
}) {
    props.transit(async () => {
        await ACT_Logout()
        window.location.reload()
    })
}
