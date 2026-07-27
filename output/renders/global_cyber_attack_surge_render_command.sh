#!/bin/bash
# NCAS FFmpeg 60s Broadcast Video Renderer
ffmpeg -f concat -safe 0 -i "E:\NCAS\output\renders\global_cyber_attack_surge_concat_list.txt" -i voiceover.mp3 -i background_music.mp3 -filter_complex "[0:v]subtitles='E:/NCAS/output/subtitles/global_cyber_attack_surge_en.srt':force_style='Fontname=Inter,Fontsize=22,PrimaryColour=&H0000F0FF,OutlineColour=&H00040814,BorderStyle=3'[v];[1:a][2:a]amix=inputs=2:weights=1 0.25[a]" -map "[v]" -map "[a]" -c:v libx264 -preset fast -crf 18 -c:a aac -b:a 192k -r 30 -s 1080x1920 "E:\NCAS\output\renders\global_cyber_attack_surge_final_60s.mp4"
