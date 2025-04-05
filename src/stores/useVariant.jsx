import { create } from 'zustand';

export default create((set, get) => ({
    // Guitar state
    body: 'body_arrow',
    headstock: 'headstock_arrow',
    headstock2: 'headstock_arrow',
    inlay: 'inlay_sharkfin',
    starPowerButton: true,
    bodyColor: 'blue',
    neckColor: 'blue',
    fretBoardColor: 'black',
    fretBoardBindingColor: 'white',
    pickGuardColor: 'black',
    hardwareColor: 'silver',
    inlayColor: 'white',
    neckButtonColor: 'black',
    neckBindingColor: 'black',
    arcadeButtonColor: 'black',
    strummerSideColor: 'black',
    strummerOffset: 0,
    shadowOffset: 0,
    isDualNeck: true,
    dualNeckOffsetPos: [0, 0, 0],
    dualNeckOffsetRot: [0, 0, 0],

    // Settings state
    isRotationEnabled: true,
    isDynamicViewEnabled: true,
    isPostEffectsEnabled: false,

    // Camera state
    cameraPosition: [0, 5, 10],
    targetType: 'default',
    targetCameraPosition: [0, 5, 10],
    cameraTarget: [0, 4, 0],
    targetCameraTarget: [0, 4, 0],

}));