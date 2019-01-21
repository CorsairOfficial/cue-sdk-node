{
  "targets": [],
  "conditions": [
    [
      "OS=='win'",
      {
        "targets": [
          {
            "target_name": "<(module_name)",
            "cflags!": [
              "-fno-exceptions"
            ],
            "cflags_cc!": [
              "-fno-exceptions"
            ],
            "sources": [
              "src/CorsairSdk.cc"
            ],
            "include_dirs": [
              "<!@(node -p \"require('node-addon-api').include\")",
              "<(module_root_dir)/CUESDK/include"
            ],
            "defines": [
              "NAPI_DISABLE_CPP_EXCEPTIONS"
            ],
            "dependencies": [
              "<!(node -p \"require('node-addon-api').gyp\")"
            ],
            "product_dir": "<(module_path)",
            "conditions": [
              [
                "target_arch == 'ia32'",
                {
                  "libraries": [
                    "<(module_root_dir)/CUESDK/lib/i386/CUESDK_2015.lib"
                  ],
                  "copies": [
                    {
                      "destination": "<(module_path)",
                      "files": [
                        "<(module_root_dir)/CUESDK/redist/i386/CUESDK_2015.dll"
                      ]
                    }
                  ]
                }
              ],
              [
                "target_arch == 'x64'",
                {
                  "libraries": [
                    "<(module_root_dir)/CUESDK/lib/x64/CUESDK.x64_2015.lib"
                  ],
                  "copies": [
                    {
                      "destination": "<(module_path)",
                      "files": [
                        "<(module_root_dir)/CUESDK/redist/x64/CUESDK.x64_2015.dll"
                      ]
                    }
                  ]
                }
              ]
            ]
          }
        ]
      }
    ]
  ]
}