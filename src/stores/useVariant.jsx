import { create } from 'zustand';

export default create(() =>
{
    return {
        base: 'viper',
        headstock: 'viper',
        baseColor: 'orange',
        neckColor: 'yellow',
        fretBoardColor: 'tan',
        fretBoardBindingColor: 'black',
        pickGuardColor: 'white',
        hardwareColor: 'gold',


        isRotationEnabled: true,
        isDynamicViewEnabled:true,
    }
})