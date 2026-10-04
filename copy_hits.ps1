Add-Type -AssemblyName System.Drawing

$base = "D:\建站打磨内容截图\爆款方法论以及自有和操盘账号"
$out = "D:\作品集建站\public\images\hits"

# 清理旧文件
Get-ChildItem $out -File | Remove-Item -Force

$jobs = @(
  # 回声屏幕所 01
  @{ code = "h-01-01"; src = "$base\屏幕\vivoX500屏幕开箱【商单】\ab2ac90ce38a7c15b4f726fb50def67d.png"; title = "vivo X500 屏幕开箱" },
  @{ code = "h-01-02"; src = "$base\屏幕\vivoX500屏幕测试【商单】\微信图片_20260921191048_3950_1483.png"; title = "vivo X500 屏幕测试" },
  @{ code = "h-01-03"; src = "$base\屏幕\vivoXFold6屏幕测试【商单】\a42c405d-d757-41d0-ab9e-4f0bb2b3d4a8.png"; title = "vivo X Fold6 屏幕测试" },
  @{ code = "h-01-04"; src = "$base\屏幕\屏幕之王爆款\793cbe25e45068ae8c117fc08b987a64.png"; title = "屏幕之王爆款" },
  @{ code = "h-01-05"; src = "$base\屏幕\旗舰机户外发热测试\ooIEQABA7wahA3GTGLGneWNHUCEBtIAAEfMKEe~tplv-dy-resize-walign-adapt-aq_540_q75.jpeg"; title = "旗舰机户外发热测试" },
  @{ code = "h-01-06"; src = "$base\屏幕\曲面屏慢慢消失\e618b095561144d79fa01083c26e9916~tplv-dy-resize-walign-adapt-aq_540_q75.jpeg"; title = "曲面屏慢慢消失" },

  # 回声现场影像对比 02
  @{ code = "h-02-01"; src = "$base\影像\F4爆款\F4封面.jpeg"; title = "F4 影像爆款" },
  @{ code = "h-02-02"; src = "$base\影像\vivoS60影像4klive长视频【商单】\微信图片_20260601122633_206_939.png"; title = "vivo S60 影像 4K Live" },
  @{ code = "h-02-03"; src = "$base\影像\vivoX300E调色盘创意【商单】\a6c37e08a4874141955f82cbbfd3c28d~tplv-dy-resize-walign-adapt-aq_540_q75.jpeg"; title = "vivo X300E 调色盘创意" },
  @{ code = "h-02-04"; src = "$base\影像\vivoX300s蔡依林演唱会【商单】\华果蓝绿决战蔡依林演唱会！实拍居然差距这么大？#vivoX300s演唱会神器 #vivoX300s蔡依林百万直拍 #vivo演唱会神器 #蔡依林 #蔡依林西安演唱会.jpg"; title = "X300s 蔡依林演唱会" },
  @{ code = "h-02-05"; src = "$base\影像\vivoX300国风01【商单】\微信图片_20260909171300_3262_1483.png"; title = "vivo X300 国风 01" },
  @{ code = "h-02-06"; src = "$base\影像\vivoX300国风02【商单】\oMfHCHwAEACiAmwwx8Bcn1ImQEAM25eKXi8ACD~tplv-dy-resize-walign-adapt-aq_540_q75.jpeg"; title = "vivo X300 国风 02" },
  @{ code = "h-02-07"; src = "$base\影像\vivoX300歌手【商单】\微信图片_20260720115034_11194_244.png"; title = "vivo X300 歌手" },
  @{ code = "h-02-08"; src = "$base\影像\vivoX300长视频【商单】\5f40aeead0ae4e79becc1aaf39d9753f~tplv-dy-resize-walign-adapt-aq_540_q75.jpeg"; title = "vivo X300 长视频" },
  @{ code = "h-02-09"; src = "$base\影像\vivoXFold6时尚之夜【商单】\微信图片_20260713120911_776_1483.jpg"; title = "X Fold6 时尚之夜" },
  @{ code = "h-02-10"; src = "$base\影像\vivoXFold6测评长视频【商单】\ScreenShot_2026-07-03_162254_291.png"; title = "X Fold6 测评长视频" },
  @{ code = "h-02-11"; src = "$base\影像\年度机皇爆款\机皇封面.jpeg"; title = "年度机皇爆款" },
  @{ code = "h-02-12"; src = "$base\影像\邓紫棋爆款\邓紫棋封面.jpeg"; title = "邓紫棋爆款" },

  # 回声拆机少女 03
  @{ code = "h-03-01"; src = "$base\拆机\iQOO15T拆机【商单】\img_v3_0215p_6522a10f-3093-4f14-a55d-06ca697243dg.png"; title = "iQOO 15T 拆机" },
  @{ code = "h-03-02"; src = "$base\拆机\iQOONeo跑分爆款【商单】\微信图片_20260824104402_259_939.png"; title = "iQOO Neo 跑分爆款" },
  @{ code = "h-03-03"; src = "$base\拆机\iQOOZ11s开箱【商单】\微信图片_20260817172528_2248_1483.png"; title = "iQOO Z11s 开箱" },
  @{ code = "h-03-04"; src = "$base\拆机\vivoX300E开箱【商单】\微信图片_20260723160828_1322_1483.png"; title = "vivo X300E 开箱" },
  @{ code = "h-03-05"; src = "$base\拆机\vivoXFold6拆机【商单】\微信图片_20260630160444_510_1483.png"; title = "vivo X Fold6 拆机" },
  @{ code = "h-03-06"; src = "$base\拆机\小米17U维修爆款\20260316-180044.png"; title = "小米 17U 维修爆款" },
  @{ code = "h-03-07"; src = "$base\拆机\拆机x500开箱【商单】\拆机封面 (2).png"; title = "X500 拆机开箱" },

  # 回声数码站 04
  @{ code = "h-04-01"; src = "$base\数码站\华为爆款\o8tyyA2jaP14gIqbAYAtiKCIAABivpxWFDQaE~tplv-dy-resize-walign-adapt-aq_540_q75.jpeg"; title = "华为爆款" },
  @{ code = "h-04-02"; src = "$base\数码站\玄戎芯片爆款\oMAAAIAsQ51AqzkDwSilCiSAeAlBggcNdEfCs2~tplv-dy-resize-walign-adapt-aq_540_q75.jpeg"; title = "玄戎芯片爆款" },

  # 回声系统测评 05
  @{ code = "h-05-01"; src = "$base\系统\vivo X Fold6原子工作台上手体验【商单】\vivo X Fold6原子工作台上手体验：你的AI折叠办公室#vivoXFold6 #OriginOS6 #AI轻办公神器 #vivo #数码科技.jpg"; title = "X Fold6 原子工作台" },
  @{ code = "h-05-02"; src = "$base\系统\WWDC？Tim的谢幕之作\史上最拉胯的WWDC？Tim的谢幕之作：究竟是草草离场还是一个新时代的开场？#WWDC #苹果 #iOS #数码科技 #发布会.jpg"; title = "WWDC Tim 谢幕之作" },

  # 回声行业观察 06
  @{ code = "h-06-01"; src = "$base\行业\iQOO16开发者大会【商单】\588fda01ab984030b51375450ae0817f~tplv-dy-resize-walign-adapt-aq_540_q75.jpeg"; title = "iQOO 16 开发者大会" },
  @{ code = "h-06-02"; src = "$base\行业\vivoX500系列主摄爆料【商单】\微信图片_20260824174916_2576_1483.png"; title = "X500 主摄爆料" },
  @{ code = "h-06-03"; src = "$base\行业\真我GT8Pro\csfsdf.png"; title = "真我 GT8 Pro" },
  @{ code = "h-06-04"; src = "$base\行业\高通长鑫爆款\4baf72919d914f569c0ca2d89f6ce1d3~tplv-dy-resize-walign-adapt-aq_540_q75.jpeg"; title = "高通长鑫爆款" },
  @{ code = "h-06-05"; src = "$base\行业\魅族flyme爆款\微信图片_20260703104542_2488_747.png"; title = "魅族 Flyme 爆款" },
  @{ code = "h-06-06"; src = "$base\行业\魅族落寞爆款\img_v3_0215p_33e20cb9-5cbb-49c1-9114-6c6b88f1d23g.png"; title = "魅族落寞爆款" },
)

foreach ($j in $jobs) {
  if (-not (Test-Path $j.src)) { Write-Host "MISS: $($j.src)"; continue }
  $img = [System.Drawing.Image]::FromFile($j.src)
  # 3:4 竖版，宽 400
  $w = 400
  $h = 533
  $bmp = New-Object System.Drawing.Bitmap($w, $h)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = 'HighQualityBicubic'
  # cover 模式：居中裁切
  $srcRatio = $img.Width / $img.Height
  $dstRatio = $w / $h
  if ($srcRatio -gt $dstRatio) {
    $newH = $img.Height
    $newW = [int]($newH * $dstRatio)
    $sx = [int](($img.Width - $newW) / 2)
    $g.DrawImage($img, (New-Object System.Drawing.Rectangle(0,0,$w,$h)), (New-Object System.Drawing.Rectangle($sx,0,$newW,$newH)), [System.Drawing.GraphicsUnit]::Pixel)
  } else {
    $newW = $img.Width
    $newH = [int]($newW / $dstRatio)
    $sy = [int](($img.Height - $newH) / 2)
    $g.DrawImage($img, (New-Object System.Drawing.Rectangle(0,0,$w,$h)), (New-Object System.Drawing.Rectangle(0,$sy,$newW,$newH)), [System.Drawing.GraphicsUnit]::Pixel)
  }
  $newPath = Join-Path $out ($j.code + ".jpg")
  $encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
  $params = New-Object System.Drawing.Imaging.EncoderParameters(1)
  $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 78L)
  $bmp.Save($newPath, $encoder, $params)
  $g.Dispose(); $bmp.Dispose(); $img.Dispose()
  Write-Host "OK: $($j.code).jpg"
}
