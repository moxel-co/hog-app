import { create } from 'zustand';

export default create((set, get) => ({
    // Guitar state
    body: 'body_arrow',
    headstock: 'headstock_arrow',
    headstock2: 'headstock_arrow',
    inlay: 'inlay_sharkfin',
    inlay2: 'inlay_sharkfin',
    starPowerButton: true,
    bodyColor: '#08149c',
    neckColor: '#08149c',
    fretBoardColor: 'black',
    fretBoardBindingColor: 'black',
    pickGuardColor: 'black',
    hardwareColor: 'silver',
    inlayColor: 'white',
    neckButtonColor: 'white',
    neckBindingColor: 'black',
    arcadeButtonColor: 'black',
    strummerSideColor: 'black',
    strummerOffset: 0,
    shadowOffset: 0,
    isDualNeck: false,
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